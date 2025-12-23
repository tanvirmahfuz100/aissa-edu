class BookmarkManager {
    constructor() {
        try {
            this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || { blogs: [], publications: [], files: [] };
        } catch (e) {
            console.warn('LocalStorage access failed:', e);
            this.bookmarks = { blogs: [], publications: [], files: [] };
        }
    }

    save() {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        } catch (e) { console.warn('LocalStorage save failed:', e); }
        this.updateBadge();
        this.renderBookmarks();
    }

    add(type, item) {
        if (!this.bookmarks[type]) this.bookmarks[type] = [];
        if (!this.bookmarks[type].find(i => i.id === item.id)) {
            this.bookmarks[type].push(item);
            this.save();
            return true;
        }
        return false;
    }

    remove(type, id) {
        if (this.bookmarks[type]) {
            this.bookmarks[type] = this.bookmarks[type].filter(i => i.id !== id);
            this.save();
            return true;
        }
        return false;
    }

    isBookmarked(type, id) {
        return this.bookmarks[type] && !!this.bookmarks[type].find(i => i.id === id);
    }

    updateBadge() {
        const count = this.bookmarks.blogs.length + this.bookmarks.publications.length + this.bookmarks.files.length;
        const badge = document.getElementById('bookmark-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    renderBookmarks() {
        const list = document.getElementById('bookmark-list');
        if (!list) return;

        const { blogs, publications, files } = this.bookmarks;
        if (blogs.length === 0 && publications.length === 0 && files.length === 0) {
            list.innerHTML = '<div class="empty-bookmarks">No bookmarks yet.</div>';
            return;
        }

        let html = '';
        if (blogs.length > 0) {
            html += '<div class="bookmark-section"><h4>Blogs</h4>';
            blogs.forEach(item => {
                html += `
                    <div class="bookmark-item">
                        <a href="post.html?id=${item.id}">${item.title}</a>
                        <button onclick="bookmarkManager.remove('blogs', '${item.id}')">&times;</button>
                    </div>
                `;
            });
            html += '</div>';
        }
        if (publications.length > 0) {
            html += '<div class="bookmark-section"><h4>Publications</h4>';
            publications.forEach(item => {
                html += `
                    <div class="bookmark-item">
                        <a href="read_publication.html?id=${item.id}">${item.title}</a>
                        <button onclick="bookmarkManager.remove('publications', '${item.id}')">&times;</button>
                    </div>
                `;
            });
            html += '</div>';
        }
        if (files.length > 0) {
            html += '<div class="bookmark-section"><h4>Files</h4>';
            files.forEach(item => {
                html += `
                    <div class="bookmark-item">
                        <a href="download.html?id=${item.id}">${item.title}</a>
                        <button onclick="bookmarkManager.remove('files', '${item.id}')">&times;</button>
                    </div>
                `;
            });
            html += '</div>';
        }
        list.innerHTML = html;
    }
}

class HistoryManager {
    constructor() {
        try {
            this.history = JSON.parse(localStorage.getItem('reading_history')) || [];
        } catch (e) {
            console.warn('LocalStorage access failed:', e);
            this.history = [];
        }
    }

    add(item) {
        // Remove existing entry for same ID to bump to top
        this.history = this.history.filter(i => i.id !== item.id);

        const entry = {
            ...item,
            timestamp: Date.now(),
            url: window.location.href // Remember where to resume
        };

        this.history.unshift(entry);

        // Keep only last 20 items
        if (this.history.length > 20) {
            this.history.pop();
        }

        try {
            localStorage.setItem('reading_history', JSON.stringify(this.history));
        } catch (e) { console.warn('LocalStorage save failed:', e); }
    }

    getRecent(limit = 3) {
        return this.history.slice(0, limit);
    }
}

class PodcastManager {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        try {
            this.progress = JSON.parse(localStorage.getItem('podcast_progress')) || {};
        } catch (e) {
            console.warn('Podcast progress access failed:', e);
            this.progress = {};
        }

        this.initListeners();
    }

    async loadPlaylist() {
        try {
            const res = await fetch('json/podcasts.json');
            this.playlist = await res.json();
        } catch (e) {
            console.error('Failed to load podcasts:', e);
        }
    }

    initListeners() {
        this.audio.addEventListener('timeupdate', () => this.updateUI());
        this.audio.addEventListener('ended', () => this.next());
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            const playIcon = document.getElementById('play-icon');
            if (playIcon) playIcon.innerHTML = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>'; // Pause icon
            const bar = document.getElementById('podcast-player-bar');
            if (bar) bar.classList.add('active');
        });
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            const playIcon = document.getElementById('play-icon');
            if (playIcon) playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>'; // Play icon
        });
    }

    async play(id, resume = true) {
        // Ensure playlist is loaded
        if (this.playlist.length === 0) {
            await this.loadPlaylist();
        }

        const index = this.playlist.findIndex(p => p.id === id);
        if (index === -1) return;

        if (this.currentIndex === index) {
            this.toggle();
            return;
        }

        this.currentIndex = index;
        const pod = this.playlist[index];
        this.audio.src = pod.audioUrl;

        // UI Updates
        const cover = document.getElementById('pod-player-cover');
        const title = document.getElementById('pod-player-title');
        const bar = document.getElementById('podcast-player-bar');

        if (cover) cover.src = pod.coverImage;
        if (title) title.textContent = pod.title;
        if (bar) bar.classList.add('active');

        if (resume && this.progress[id]) {
            this.audio.currentTime = this.progress[id];
        }

        this.audio.play().catch(e => console.warn('Playback failed:', e));
    }

    toggle() {
        if (this.audio.src) {
            const bar = document.getElementById('podcast-player-bar');
            if (bar) bar.classList.add('active');
            if (this.isPlaying) this.audio.pause();
            else this.audio.play();
        }
    }

    next() {
        if (this.currentIndex < this.playlist.length - 1) {
            this.play(this.playlist[this.currentIndex + 1].id);
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.play(this.playlist[this.currentIndex - 1].id);
        }
    }

    stop() {
        this.audio.pause();
        this.audio.src = '';
        this.currentIndex = -1;
        const bar = document.getElementById('podcast-player-bar');
        if (bar) bar.classList.remove('active');
    }

    seek(percent) {
        if (this.audio.duration) {
            this.audio.currentTime = (percent / 100) * this.audio.duration;
        }
    }

    setSpeed(speed) {
        this.audio.playbackRate = parseFloat(speed);
    }

    setVolume(value) {
        this.audio.volume = Math.max(0, Math.min(1, value));
        const fill = document.getElementById('pod-volume-fill');
        if (fill) fill.style.width = `${this.audio.volume * 100}%`;
    }

    updateUI() {
        if (!this.audio.duration) return;

        const progressFill = document.getElementById('pod-progress-fill');
        const currentTimeEl = document.getElementById('pod-current-time');
        const totalTimeEl = document.getElementById('pod-total-time');

        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        if (progressFill) progressFill.style.width = `${percent}%`;

        if (currentTimeEl) currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        if (totalTimeEl) totalTimeEl.textContent = this.formatTime(this.audio.duration);

        // Save progress
        const currentPod = this.playlist[this.currentIndex];
        if (currentPod) {
            this.progress[currentPod.id] = this.audio.currentTime;
            try {
                localStorage.setItem('podcast_progress', JSON.stringify(this.progress));
            } catch (e) { }
        }
    }

    formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [h, m, s].map(v => v < 10 ? '0' + v : v).filter((v, i) => v !== '00' || i > 0).join(':');
    }
}

class SettingsManager {
    constructor() {
        try {
            this.settings = JSON.parse(localStorage.getItem('user_settings')) || { fontSize: 16 };
        } catch (e) {
            this.settings = { fontSize: 16 };
        }
        this.applySettings();
    }

    setFontSize(size) {
        this.settings.fontSize = size;
        this.save();
        this.applySettings();
    }

    increaseFontSize() { this.setFontSize(this.settings.fontSize + 2); }
    decreaseFontSize() { this.setFontSize(Math.max(12, this.settings.fontSize - 2)); }
    resetFontSize() { this.setFontSize(16); }

    save() {
        try {
            localStorage.setItem('user_settings', JSON.stringify(this.settings));
        } catch (e) { console.warn('Saving settings failed', e); }
    }

    applySettings() {
        document.documentElement.style.fontSize = `${this.settings.fontSize}px`;
        const display = document.getElementById('font-size-display');
        if (display) {
            display.innerText = `${this.settings.fontSize}px`;
        }
    }
}

class ShareManager {
    static share(platform, title, url) {
        const text = encodeURIComponent(title);
        const link = encodeURIComponent(url || window.location.href);

        let shareUrl = '';
        if (platform === 'whatsapp') {
            shareUrl = `https://wa.me/?text=${text}%20${link}`;
        } else if (platform === 'messenger') {
            shareUrl = `fb-messenger://share/?link=${link}`; // Mobile deep link
            // Fallback for web if needed usually handled by FB sharer
            if (!/Android|iPhone/i.test(navigator.userAgent)) {
                shareUrl = `https://www.facebook.com/dialog/send?link=${link}&app_id=YOUR_APP_ID&redirect_uri=${link}`;
                // Since we don't have an app ID, we'll try a generic generic share or clipboard copy
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
            }
        }

        window.open(shareUrl, '_blank');
    }
}

window.bookmarkManager = new BookmarkManager();
window.historyManager = new HistoryManager();
window.settingsManager = new SettingsManager();
window.podcastManager = new PodcastManager();
window.shareManager = ShareManager;

const HEADER_CONTENT = `
<div id="app-container">
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="workspace-switcher">
                <img src="assets/images/logo.png" alt="Logo" style="width: 24px; height: 24px; border-radius: 4px;">
                <span>AISSA-EDU</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto; opacity: 0.5;"><path d="m6 9 6 6 6-6"/></svg>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <div class="nav-group">
                <div class="nav-item" data-link="index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span>Home</span>
                </div>
                <div class="nav-item" data-link="course_materials.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    <span>Materials</span>
                </div>
                <div class="nav-item" data-link="question_bank.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>Archive</span>
                </div>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">Research & Insights</div>
                <div class="nav-item" data-link="publications.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <span>Publications</span>
                </div>
                <div class="nav-item" data-link="blog.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>Blog</span>
                </div>
                <div class="nav-item" data-link="podcast.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    <span>Podcast</span>
                </div>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">Tools</div>
                <div class="nav-item" data-link="gpa_calculator.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    <span>GPA Calculator</span>
                </div>
            </div>

            <div class="nav-group">
                <div class="nav-group-title">General</div>
                <div class="nav-item" data-link="about.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <span>About</span>
                </div>
                <div class="nav-item" data-link="contact.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span>Contact Us</span>
                </div>
                <div class="nav-item" id="settings-trigger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    <span>Settings</span>
                </div>
            </div>
        </nav>

        <div class="sidebar-footer" style="padding: var(--space-4); border-top: 1px solid var(--border);">
            <div class="nav-item" style="cursor: default; opacity: 0.5;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>
                <span>v1.2.0</span>
            </div>
        </div>
    </aside>

    <div class="main-wrapper">
        <header class="top-bar">
            <div class="top-bar-left">
                <button id="mobile-menu-toggle" style="display: none; background: none; border: none; color: var(--text-primary); cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <div class="breadcrumb" id="breadcrumb">
                    <span style="font-weight: 600; color: var(--text-primary);">AISSA-EDU</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5;"><path d="m9 18 6-6-6-6"/></svg>
                    <span id="current-page-name">Home</span>
                </div>
            </div>
            <div class="top-bar-right">
                <div class="search-trigger" id="cmd-k-trigger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <span>Search...</span>
                    <kbd>Ctrl K</kbd>
                </div>
                <div class="user-profile" style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), #7c89eb); color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(94, 106, 210, 0.3);">
                    TM
                </div>
            </div>
        </header>
        <main class="content-area" id="main-content-target">
            <!-- Page content will be moved here -->
        </main>
    </div>
</div>

<!-- Command Menu -->
<div class="modal-overlay" id="command-menu-overlay">
    <div class="command-menu">
        <div class="command-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" class="command-input" id="command-input" placeholder="Search for anything..." autofocus>
        </div>
        <div class="command-list" id="command-list">
            <!-- Dynamic commands -->
        </div>
    </div>
</div>

<!-- Settings Modal -->
<div class="modal-overlay" id="settings-overlay">
    <div class="command-menu" style="max-width: 400px;">
        <div style="padding: 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 16px;">Settings</h3>
            <button id="close-settings" style="background: none; border: none; color: var(--text-secondary); cursor: pointer;">&times;</button>
        </div>
        <div style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="color: var(--text-secondary); font-size: 14px;">Font Size</span>
                <span id="font-size-display" style="color: var(--accent); font-weight: 600;">16px</span>
            </div>
            <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                <button class="btn btn-secondary" style="flex: 1;" onclick="settingsManager.decreaseFontSize()">A-</button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="settingsManager.resetFontSize()">Reset</button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="settingsManager.increaseFontSize()">A+</button>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border);">
                 <span style="color: var(--text-secondary); font-size: 14px;">Shortcuts</span>
                 <button class="btn-text" style="font-size: 12px; color: var(--accent); background: none; border: none; cursor: pointer;" onclick="document.getElementById('shortcuts-overlay').classList.add('active')">View Shortcuts</button>
            </div>
        </div>
    </div>
</div>

<!-- Shortcuts Modal -->
<div class="modal-overlay" id="shortcuts-overlay">
    <div class="command-menu" style="max-width: 400px; padding: 0;">
        <div style="padding: 24px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; font-size: 18px;">Keyboard Shortcuts</h3>
            <button onclick="document.getElementById('shortcuts-overlay').classList.remove('active')" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 24px; line-height: 1;">&times;</button>
        </div>
        <div style="padding: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 14px;">Search</span>
                    <kbd style="padding: 4px 8px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 4px; font-size: 12px; color: var(--text-primary);">Ctrl K</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 14px;">Increase Font</span>
                    <kbd style="padding: 4px 8px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 4px; font-size: 12px; color: var(--text-primary);">Ctrl Alt +</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 14px;">Decrease Font</span>
                    <kbd style="padding: 4px 8px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 4px; font-size: 12px; color: var(--text-primary);">Ctrl Alt -</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary); font-size: 14px;">Navigation</span>
                    <kbd style="padding: 4px 8px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: 4px; font-size: 12px; color: var(--text-primary);">Alt &larr; / &rarr;</kbd>
                </div>
            </div>
            <div style="margin-top: 24px; text-align: right;">
                <button onclick="document.getElementById('shortcuts-overlay').classList.remove('active')" class="btn btn-secondary">Got it</button>
            </div>
        </div>
    </div>
</div>

<!-- Notice Detail Modal -->
<div class="modal-overlay" id="notice-detail-modal">
    <div class="command-menu" style="max-width: 500px;">
        <div style="padding: 24px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: flex-start;">
            <h3 id="notice-modal-title" style="margin: 0; font-size: 20px; line-height: 1.4; color: var(--text-primary);">Notice Title</h3>
            <button onclick="document.getElementById('notice-detail-modal').classList.remove('active')" style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 24px; padding: 0; line-height: 1;">&times;</button>
        </div>
        <div style="padding: 24px;">
            <p id="notice-modal-content" style="color: var(--text-secondary); line-height: 1.6; font-size: 16px; margin: 0;">Notice content goes here...</p>
            <div style="margin-top: 32px; text-align: right;">
                <button onclick="document.getElementById('notice-detail-modal').classList.remove('active')" class="btn btn-secondary">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Podcast Player (Spotify Style) -->
<div class="podcast-player" id="podcast-player-bar">
    <div class="player-progress-area" onclick="const rect = this.getBoundingClientRect(); podcastManager.seek(((event.clientX - rect.left) / rect.width) * 100)">
        <div class="player-progress-fill" id="pod-progress-fill"></div>
    </div>
    
    <div class="player-content-inner">
        <div class="player-info">
            <img src="https://images.unsplash.com/photo-1478737270239-2fccd2c78621?q=80&w=200&h=200&auto=format&fit=crop" id="pod-player-cover" class="player-cover">
            <div class="player-text">
                <div class="player-title" id="pod-player-title">Episode Title</div>
                <div class="player-subtitle">AISSA Podcast</div>
            </div>
            <button class="player-heart-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
        </div>
        
        <div class="player-center-controls">
            <div class="control-btns">
                <button class="control-btn" style="opacity: 0.5;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                </button>
                <button class="control-btn" onclick="podcastManager.prev()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
                <button class="control-btn play-btn" onclick="podcastManager.toggle()">
                    <svg id="play-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
                <button class="control-btn" onclick="podcastManager.next()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z"/></svg>
                </button>
                <button class="control-btn" style="opacity: 0.5;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                </button>
            </div>
            <div class="player-time-info">
                <span id="pod-current-time">0:00</span>
                <span style="opacity: 0.3; margin: 0 4px;">/</span>
                <span id="pod-total-time">0:00</span>
            </div>
        </div>

        <div class="player-extras">
            <select class="speed-select" onchange="podcastManager.setSpeed(this.value)">
                <option value="0.5">0.5x</option>
                <option value="1" selected>1.0x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2.0x</option>
            </select>
            <div class="volume-container">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                <div class="volume-bar" onclick="const rect = this.getBoundingClientRect(); podcastManager.setVolume((event.clientX - rect.left) / rect.width)">
                    <div class="volume-fill" id="pod-volume-fill" style="width: 80%;"></div>
                </div>
            </div>
            <button class="player-close-btn" onclick="podcastManager.stop()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Podcast Playlist
    if (window.podcastManager) {
        podcastManager.loadPlaylist();
    }

    // 1. Setup the shell (only if not already hardcoded)
    const existingShell = document.getElementById('app-container');
    if (!existingShell) {
        const originalMain = document.getElementById('main-content');
        const body = document.body;

        const shellContainer = document.createElement('div');
        shellContainer.innerHTML = HEADER_CONTENT;

        const target = shellContainer.querySelector('#main-content-target');
        if (originalMain) {
            while (originalMain.firstChild) {
                target.appendChild(originalMain.firstChild);
            }
            originalMain.remove();
        }

        body.innerHTML = '';
        body.appendChild(shellContainer.firstElementChild); // app-container

        // Inject essential modals and player bar
        const modals = [
            '#command-menu-overlay',
            '#settings-overlay',
            '#shortcuts-overlay',
            '#notice-detail-modal',
            '#podcast-player-bar'
        ];

        modals.forEach(id => {
            const el = shellContainer.querySelector(id);
            if (el) body.appendChild(el);
        });
    } else {
        // Even if shell exists, ensure modals are present
        if (!document.getElementById('command-menu-overlay') ||
            !document.getElementById('settings-overlay') ||
            !document.getElementById('shortcuts-overlay') ||
            !document.getElementById('notice-detail-modal') ||
            !document.getElementById('podcast-player-bar')) {
            const temp = document.createElement('div');
            temp.innerHTML = HEADER_CONTENT;
            ['#command-menu-overlay', '#settings-overlay', '#shortcuts-overlay', '#notice-detail-modal', '#podcast-player-bar'].forEach(id => {
                if (!document.querySelector(id)) {
                    const el = temp.querySelector(id);
                    if (el) document.body.appendChild(el);
                }
            });
        }
    }

    // 2. Navigation Logic (Soft Navigation for Audio Persistence)
    const navigateTo = async (link) => {
        try {
            const response = await fetch(link);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 1. Update Content
            const target = document.getElementById('main-content-target');
            // Look for content in the fetched document
            const source = doc.getElementById('main-content') || doc.querySelector('main.content-area') || doc.body;

            if (source && target) {
                target.innerHTML = '';
                // Copy children of source to target
                // If the source has children, use them. If not, it might be the content itself.
                while (source.firstChild) {
                    target.appendChild(source.firstChild);
                }

                // 2. Update URL & Title
                history.pushState(null, doc.title, link);
                document.title = doc.title;

                // 3. Update Sidebar Active State
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                const newActive = document.querySelector(`.nav-item[data-link="${link}"]`);
                if (newActive) {
                    newActive.classList.add('active');
                    const pageName = document.getElementById('current-page-name');
                    if (pageName) pageName.textContent = newActive.querySelector('span').textContent;
                }

                // 4. Re-run page specific logic
                const scripts = target.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    }
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });

                document.dispatchEvent(new Event('DOMContentLoaded'));
                document.dispatchEvent(new CustomEvent('pageLoaded', { detail: { link } }));

                window.scrollTo(0, 0);
            } else {
                window.location.href = link;
            }
        } catch (e) {
            console.error('Soft navigation failed:', e);
            window.location.href = link;
        }
    };

    const navItems = document.querySelectorAll('.nav-item[data-link]');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navItems.forEach(item => {
        const link = item.getAttribute('data-link');
        if (link === currentPage) {
            item.classList.add('active');
            const pageNameDisplay = document.getElementById('current-page-name');
            if (pageNameDisplay) pageNameDisplay.textContent = item.querySelector('span').textContent;
        }
        item.addEventListener('click', (e) => {
            // Only soft navigate for internal links
            if (link.startsWith('http')) return;
            e.preventDefault();
            navigateTo(link);
        });
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', () => {
        const link = window.location.pathname.split('/').pop() || 'index.html';
        navigateTo(link);
    });

    // 3. Theme Logic (Permanent Dark Mode)
    document.documentElement.setAttribute('data-theme', 'dark');

    // 4. Shortcut Manager & Command Menu
    class ShortcutManager {
        constructor() {
            this.shortcuts = {};
            this.registerDefaults();
            this.listen();
        }

        register(keys, action, description) {
            this.shortcuts[keys.toLowerCase()] = { action, description };
        }

        registerDefaults() {
            // Font Size
            this.register('ctrl+alt+=', () => settingsManager.increaseFontSize(), 'Increase Font Size');
            this.register('ctrl+alt++', () => settingsManager.increaseFontSize(), 'Increase Font Size'); // shift+=
            this.register('ctrl+alt+-', () => settingsManager.decreaseFontSize(), 'Decrease Font Size');
            this.register('ctrl+alt+0', () => settingsManager.resetFontSize(), 'Reset Font Size');

            // Navigation
            this.register('alt+arrowleft', () => window.history.back(), 'Go Back');
            this.register('alt+arrowright', () => window.history.forward(), 'Go Forward');

            // Command Menu
            this.register('ctrl+k', () => toggleCmdMenu(), 'Open Command Menu');
            this.register('meta+k', () => toggleCmdMenu(), 'Open Command Menu'); // Mac

            // PDF Specific (Triggered via DOM presence)
            this.register('ctrl+d', (e) => {
                const pdfDarkBtn = document.getElementById('pdf-dark-mode-btn');
                if (pdfDarkBtn && pdfDarkBtn.offsetParent !== null) {
                    e.preventDefault();
                    pdfDarkBtn.click();
                }
            }, 'Toggle PDF Dark Mode');

            // Podcast Controls
            this.register(' ', (e) => {
                if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                    e.preventDefault();
                    podcastManager.toggle();
                }
            }, 'Play/Pause Podcast');
            this.register('ctrl+arrowright', () => podcastManager.next(), 'Next Episode');
            this.register('ctrl+arrowleft', () => podcastManager.prev(), 'Previous Episode');
        }

        listen() {
            window.addEventListener('keydown', (e) => {
                // Construct key string: modifiers + key
                let parts = [];
                if (e.ctrlKey) parts.push('ctrl');
                if (e.altKey) parts.push('alt');
                if (e.metaKey) parts.push('meta');
                if (e.shiftKey && e.key.length > 1) parts.push('shift'); // Only if not a char

                // Handle special keys
                const k = e.key.toLowerCase();
                if (['control', 'alt', 'shift', 'meta'].includes(k)) return;

                parts.push(k);
                const combo = parts.join('+');

                if (this.shortcuts[combo]) {
                    // Prevent default only for registered text/special shortcuts to avoid blocking everything
                    if (['k', 'd', '=', '-', '0', 'arrowleft', 'arrowright'].some(x => k.includes(x))) {
                        e.preventDefault();
                    }
                    this.shortcuts[combo].action(e);
                } else if (e.key === 'Escape') {
                    const overlay = document.getElementById('command-menu-overlay');
                    if (overlay && overlay.classList.contains('active')) toggleCmdMenu();
                }
            });
        }
    }

    window.shortcutManager = new ShortcutManager();

    const cmdKTrigger = document.getElementById('cmd-k-trigger');
    const cmdMenuOverlay = document.getElementById('command-menu-overlay');
    const cmdInput = document.getElementById('command-input');
    const cmdList = document.getElementById('command-list');

    function toggleCmdMenu() {
        cmdMenuOverlay.classList.toggle('active');
        if (cmdMenuOverlay.classList.contains('active')) {
            cmdInput.focus();
            renderCommands('');
        }
    }

    if (cmdKTrigger) cmdKTrigger.addEventListener('click', toggleCmdMenu);
    if (cmdMenuOverlay) cmdMenuOverlay.addEventListener('click', (e) => {
        if (e.target === cmdMenuOverlay) toggleCmdMenu();
    });

    const commands = [
        { title: 'Go to Home', icon: 'home', link: 'index.html' },
        { title: 'Course Materials', icon: 'book', link: 'course_materials.html' },
        { title: 'Question Bank', icon: 'archive', link: 'question_bank.html' },
        { title: 'Research Publications', icon: 'file-text', link: 'publications.html' },
        { title: 'Read Blog', icon: 'edit-3', link: 'blog.html' },
        { title: 'GPA Calculator', icon: 'layers', link: 'gpa_calculator.html' },
        { title: 'Increase Font Size', icon: 'type', action: () => settingsManager.setFontSize(settingsManager.settings.fontSize + 2) },
        { title: 'Decrease Font Size', icon: 'type', action: () => settingsManager.setFontSize(Math.max(12, settingsManager.settings.fontSize - 2)) },
        { title: 'Reset Font Size', icon: 'type', action: () => settingsManager.setFontSize(16) },
        { title: 'About AISSA-EDU', icon: 'info', link: 'about.html' },
        { title: 'Contact Support', icon: 'mail', link: 'contact.html' }
    ];

    function renderCommands(query) {
        const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
        cmdList.innerHTML = filtered.map(c => `
            <div class="command-item" data-link="${c.link || ''}">
                <span>${c.title}</span>
            </div>
        `).join('');

        cmdList.querySelectorAll('.command-item').forEach((item, idx) => {
            item.addEventListener('click', () => {
                const cmd = filtered[idx];
                if (cmd.link) {
                    window.location.href = cmd.link;
                } else if (cmd.action) {
                    cmd.action();
                    toggleCmdMenu();
                }
            });
        });
    }

    if (cmdInput) cmdInput.addEventListener('input', (e) => renderCommands(e.target.value));

    // 5. Mobile Logic
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (window.innerWidth <= 768 && mobileToggle) {
        mobileToggle.style.display = 'block';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && !sidebar.contains(e.target) && mobileToggle && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // 6. Settings Modal Logic
    const settingsTrigger = document.getElementById('settings-trigger');
    const settingsOverlay = document.getElementById('settings-overlay');
    const closeSettings = document.getElementById('close-settings');
    const fontSizeDisplay = document.getElementById('font-size-display');

    function updateSettingsUI() {
        if (fontSizeDisplay && settingsManager) {
            fontSizeDisplay.textContent = settingsManager.settings.fontSize + 'px';
        }
    }

    function toggleSettings() {
        settingsOverlay.classList.toggle('active');
        if (settingsOverlay.classList.contains('active')) updateSettingsUI();
    }

    if (settingsTrigger) settingsTrigger.addEventListener('click', toggleSettings);
    if (closeSettings) closeSettings.addEventListener('click', toggleSettings);
    if (settingsOverlay) settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) toggleSettings();
    });

    // Hook into SettingsManager to update UI when changed
    // We can do this by monkey-patching or just polling, but adding a listener to the buttons is enough 
    // since the onclick handlers are inline in the HTML we injected.
    // Ideally we'd publish an event, but for now let's just observe clicks on the buttons we created.
    // Actually, let's just make sure the display updates when the modal opens.
});

// Helper function to get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
