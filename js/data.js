const NOTICES_DATA = [
    {
        "id": "notice_1",
        "title": "IER Institute ranks top in regional research excellence for 2025",
        "content": "The Institute of Education and Research (IER) has been officially recognized as the leading research institution in the region for the 2025 academic year, following a comprehensive review of publication metrics and academic impact."
    },
    {
        "id": "notice_2",
        "title": "New Digital Archive launched with over 5,000 academic resources",
        "content": "Our new AISSA-EDU Digital Archive is now live! Students can access over 5,000 digitized resources, including previous year questions, lecture notes, and research papers from the AIS department."
    },
    {
        "id": "notice_3",
        "title": "Upcoming Symposium: The Impact of Blockchain on Modern Auditing",
        "content": "Join us on January 15th, 2026, for a specialized symposium featuring guest speakers from major accounting firms discussing how blockchain technology is reshaping the future of audit practices."
    },
    {
        "id": "notice_4",
        "title": "Faculty of AIS announces new partnership with Global Finance Council",
        "content": "The Faculty of AIS has signed a landmark partnership agreement with the Global Finance Council, providing our students with exclusive internship opportunities and access to professional certifications."
    },
    {
        "id": "notice_5",
        "title": "Student Research Grant applications now open for Spring 2026",
        "content": "Applications for the AISSA Student Research Grant are now being accepted. Proposals focused on Financial Technology or Sustainable Accounting are highly encouraged. Deadline: December 30th."
    },
    {
        "id": "notice_6",
        "title": "Library expands collection with premium international journals",
        "content": "We have successfully negotiated access to three new premium international journal databases for all AIS students. Access is available through the department login portal."
    }
];

const FEATURED_DATA = {
    "title": "Advancing Research in Accounting & Information Systems",
    "description": "Our institute is dedicated to bridging the gap between academic theory and professional practice. Explore our latest research initiatives and educational programs designed to prepare students for the future of finance.",
    "highlights": [
        "Data Analytics",
        "FinTech",
        "Sustainability",
        "AI in Audit",
        "Financial Reporting"
    ],
    "cta": "Explore Research",
    "ctaLink": "publications.html",
    "image": "featured/1766344048520-feature.gif"
};


const PUBLICATIONS_DATA = [
    {
        "id": "1766337674467",
        "title": "The Impact of GDP on Cross-Country Efficiency in Wealth Maximization: a Joint Analysis Through the Stochastic Frontier and Generalized Method of Moments",
        "faculty": "Md Harun Or Rosid",
        "authors": "Md Harun Or Rosid; Zhao Xuefeng; Sk Alamgir Hossain; Mohammad Raihanul Hasan; Md Reza Sultanuzzaman",
        "summary": "This study examines how GDP affects cross-country efficiency in wealth maximization using data from 106 countries (2009–2018) and a joint approach combining Stochastic Frontier Analysis (SFA) and Generalized Method of Moments (GMM). It finds that while labor and capital positively contribute to incremental net wealth, GDP has a significant negative impact on wealth maximization efficiency, reflecting diminishing marginal returns as economies grow larger. High-GDP countries tend to accumulate more wealth in absolute terms but do so less efficiently than smaller economies. The regression results further show that past efficiency improves future efficiency, whereas imports, broad money supply, and exchange rate volatility undermine wealth efficiency, while consumer price index has a positive effect. Overall, the findings suggest that GDP growth alone is not sufficient for efficient wealth creation, highlighting the need for policymakers to focus on efficiency-oriented macroeconomic management rather than growth-only strategies.",
        "link": "https://drive.google.com/file/d/1aJF049RGKWhEI0PMcIZ7JrlbNSzAFmUk/view?usp=sharing"
    }
];

const CURRICULUM_DATA = {
    "BBA": {
        "years": {
            "1": {
                "semesters": {
                    "1": [
                        { "code": "1101", "course_title": "Introduction to Financial Accounting", "credit": 3 },
                        { "code": "1102", "course_title": "Introduction to Business", "credit": 3 },
                        { "code": "1103", "course_title": "Business Communication and Report Writing", "credit": 3 },
                        { "code": "1104", "course_title": "Mathematics for Business Decisions-I", "credit": 3 },
                        { "code": "1105", "course_title": "History of the Emergence of Bangladesh", "credit": 4 }
                    ],
                    "2": [
                        { "code": "1201", "course_title": "Intermediate Accounting", "credit": 3 },
                        { "code": "1202", "course_title": "Microeconomics", "credit": 3 },
                        { "code": "1203", "course_title": "Management", "credit": 3 },
                        { "code": "1204", "course_title": "Mathematics for Business Decisions-II", "credit": 3 },
                        { "code": "1205", "course_title": "Computer Concepts and Application", "credit": 2 },
                        { "code": "1206", "course_title": "Lab: Office Application", "credit": 2 }
                    ]
                }
            },
            "2": {
                "semesters": {
                    "3": [
                        { "code": "2101", "course_title": "Advanced Financial Accounting-I", "credit": 3 },
                        { "code": "2102", "course_title": "Macroeconomics", "credit": 3 },
                        { "code": "2103", "course_title": "Business Statistics-I", "credit": 3 },
                        { "code": "2104", "course_title": "Business Laws", "credit": 3 },
                        { "code": "2105", "course_title": "Financial Management", "credit": 3 }
                    ],
                    "4": [
                        { "code": "2201", "course_title": "Advanced Financial Accounting–II", "credit": 3 },
                        { "code": "2202", "course_title": "Corporate Laws and Secretarial Practices", "credit": 3 },
                        { "code": "2203", "course_title": "Business Statistics-II", "credit": 3 },
                        { "code": "2204", "course_title": "Marketing", "credit": 3 },
                        { "code": "2205", "course_title": "Income Tax: Laws and Practice", "credit": 3 },
                        { "code": "2206", "course_title": "Lab: Programming and Database Management", "credit": 2 }
                    ]
                }
            },
            "3": {
                "semesters": {
                    "5": [
                        { "code": "3101", "course_title": "Cost Accounting", "credit": 3 },
                        { "code": "3102", "course_title": "Corporate Finance", "credit": 3 },
                        { "code": "3103", "course_title": "Audit and Assurance", "credit": 3 },
                        { "code": "3104", "course_title": "Banking and Insurance", "credit": 3 },
                        { "code": "3105", "course_title": "VAT and Cross-Border Taxation", "credit": 3 },
                        { "code": "3106", "course_title": "Entrepreneurship and Business Development", "credit": 1 }
                    ],
                    "6": [
                        { "code": "3201", "course_title": "Management Accounting", "credit": 3 },
                        { "code": "3202", "course_title": "Corporate Reporting", "credit": 3 },
                        { "code": "3203", "course_title": "Forensic Accounting", "credit": 3 },
                        { "code": "3204", "course_title": "Organizational Behavior", "credit": 3 },
                        { "code": "3205", "course_title": "Accounting Information Systems", "credit": 2 },
                        { "code": "3206", "course_title": "Lab: Enterprise Resource Planning", "credit": 2 }
                    ]
                }
            },
            "4": {
                "semesters": {
                    "7": [
                        { "code": "4101", "course_title": "Advanced Management Accounting", "credit": 3 },
                        { "code": "4102", "course_title": "Financial Market and Investment Analysis", "credit": 3 },
                        { "code": "4103", "course_title": "Public Sector and NGO Accounting", "credit": 3 },
                        { "code": "4104", "course_title": "Supply Chain and Operation Management", "credit": 3 },
                        { "code": "4105", "course_title": "IT Governance and Information System Audit", "credit": 3 }
                    ],
                    "8": [
                        { "code": "4201", "course_title": "Accounting Theory", "credit": 3 },
                        { "code": "4202", "course_title": "Business Analysis and Valuation", "credit": 3 },
                        { "code": "4203", "course_title": "Research Methodology", "credit": 3 },
                        { "code": "4204", "course_title": "Strategic Management", "credit": 3 },
                        { "code": "4205", "course_title": "Data Analytics", "credit": 2 },
                        { "code": "4206", "course_title": "Lab: Application of Data Analytic Tools", "credit": 2 }
                    ]
                }
            }
        }
    },
    "MBA": {
        "years": {
            "1": {
                "semesters": {
                    "1": [],
                    "2": []
                }
            }
        }
    }
};


const BLOG_DATA = [
    {
        'id': 'post_1',
        'title': 'Tips for Exam Success',
        'thumbnail': 'assets/images/exam_tips.jpg',
        'author': 'Tanvir',
        'date': '2025-11-20',
        'post_file': 'json/blog/post_1.json',
        'description': 'Learn how to prepare effectively for your upcoming exams with these proven strategies.'
    },
    {
        'id': 'post_2',
        'title': 'Career in AIS',
        'thumbnail': 'assets/images/career_ais.jpg',
        'author': 'Alumni Association',
        'date': '2025-11-25',
        'post_file': 'json/blog/post_2.json',
        'description': 'Explore the various career paths available for AIS graduates.'
    }
];


const BLOG_POSTS = {
    'post_1': {
        'title': 'Tips for Exam Success',
        'author': 'Tanvir',
        'date': '2025-11-20',
        'content': '<p>Preparing for exams can be stressful, but with the right strategy, you can succeed. Here are some tips...</p><h3>1. Start Early</h3><p>Dont wait until the last minute...</p>'
    }
};


const QUESTIONS_DATA = {};


const RESOURCES_DATA = [];
