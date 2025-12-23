// Question Bank Data
// This file contains the question data for various sessions to ensure compatibility without fetch()

const questionBankData = {
    "2022-23": {
        "bba_1st": {
            "document_title": "Course Examination",
            "course_name": "Accounting & Information Systems",
            "course_code": "AIS 1101",
            "semester": "Fall Semester, 2022-2023",
            "course_unit": "Introduction to Financial Accounting",
            "full_marks": 60,
            "questions": [
                {
                    "question_number": "1 (a)",
                    "marks": "1:00 Hours",
                    "instruction": "(Answer any four of the following questions)",
                    "content": "An analysis of the transactions made by **Acquitne & Co.**, a certified public accounting firm, for the month of August is shown as follows. The expenses were $560 for rent, $400 for utilities, and salaries of $800 to employees.",
                    "transaction_analysis_table": {
                        "header": ["Cash +", "A/R +", "Supplies +", "Equipment =", "A/P +", "Owner's Capital -", "Owner's Drawings +", "Revenues -", "Expenses"],
                        "rows": [
                            { "transaction": 1, "Cash": "$15,000", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "$15,000", "Owner's Drawings": "", "Revenues": "", "Expenses": "" },
                            { "transaction": 2, "Cash": "-500", "A/R": "", "Supplies": "", "Equipment": "+5,000", "A/P": "+5,000", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "" },
                            { "transaction": 3, "Cash": "+750", "A/R": "+750", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "" },
                            { "transaction": 4, "Cash": "+4,500", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "+4,500", "Expenses": "" },
                            { "transaction": 5, "Cash": "-1,500", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "+1,500", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "" },
                            { "transaction": 6, "Cash": "-2,000", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "-2,000", "Revenues": "", "Expenses": "" },
                            { "transaction": 7, "Cash": "-560", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "-560" },
                            { "transaction": 8, "Cash": "-450", "A/R": "", "Supplies": "-450", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "" },
                            { "transaction": 9, "Cash": "-800", "A/R": "", "Supplies": "", "Equipment": "", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "-800" },
                            { "transaction": 10, "Cash": "", "A/R": "", "Supplies": "", "Equipment": "+400", "A/P": "", "Owner's Capital": "", "Owner's Drawings": "", "Revenues": "", "Expenses": "-400" }
                        ]
                    },
                    "requirements": [
                        "i. Describe each transaction that occurred for the month.",
                        "ii. Determine how much owner's equity increased/decreased for the month."
                    ]
                },
                {
                    "question_number": "1 (b)",
                    "content": "On June 1, Cindy Godfrey started Divided Designs Co., a company that provides craft opportunities, by investing $15,000 cash in the business. Following are the assets and liabilities of the company at June 30 and the revenues and expenses for the month of June.",
                    "data_june_30": {
                        "assets_liabilities": {
                            "Cash": "$10,150",
                            "Accounts Receivable": "2,000",
                            "Supplies": "2,000",
                            "Equipment": "10,000",
                            "Notes Payable": "9,000",
                            "Accounts Payable": "1,200"
                        },
                        "revenues_expenses": {
                            "Service Revenue": "$6,500",
                            "Advertising Expense": "500",
                            "Rent Expense": "1,200",
                            "Gasoline Expense": "200",
                            "Utilities Expense": "150"
                        },
                        "additional_info": "Cindy made no additional investment in June but withdrew $1,300 in cash for personal use during the month."
                    },
                    "requirements": [
                        "i. Prepare an income statement and owner's equity statement for the month of June and a balance sheet at June 30, 2022.",
                        "ii. Prepare an income statement and owner's equity statement for June assuming the following data are not included above: (a) $900 of services were performed and billed but not collected at June 30, and (b) $150 of gasoline expense was incurred but not paid."
                    ]
                },
                {
                    "question_number": "2 (a)",
                    "marks": "9+6=15",
                    "content": "Vera Ernst is a licensed dentist. During the first month of the operation of her business, the following events and transactions occurred.",
                    "transactions": [
                        "April 1 Invested $20,000 cash in her business.",
                        "1 Hired a secretary-receptionist at a salary of $700 per week payable monthly.",
                        "1 Paid office rent for the month $1,500.",
                        "2 Purchased dental supplies on account from Dazzle Company $3,000.",
                        "10 Performed $600 cash and $400 billed services on credit, $1,000.",
                        "11 Received $1,000 cash advance from Leah Mataruka for an implant.",
                        "20 Received $2,100 cash for services performed for Michael Santos.",
                        "25 Paid accounts on account for the month $2,400.",
                        "30 Paid $2,600 to Dazzle for accounts payable due."
                    ],
                    "instructions": [
                        "Vera uses the following chart of accounts: No. 101 Cash, No. 112 Accounts Receivable, No. 126 Supplies, No. 201 Accounts Payable, No. 207 Unearned Service Revenue, No. 301 Owner's Capital, No. 400 Service Revenue, No. 726 Salaries and Wages Expense, and No. 729 Rent Expense."
                    ],
                    "requirements": [
                        "i. Journalize the transactions.",
                        "ii. Post to the ledger accounts.",
                        "iii. Prepare a trial balance on April 30, 2022."
                    ]
                },
                {
                    "question_number": "2 (b)",
                    "content": "The following trial balance of Hatim Co. does not balance.",
                    "trial_balance_table": {
                        "title": "Hatim Co. Trial Balance June 30, 2022",
                        "header": ["Accounts", "Debit", "Credit"],
                        "rows": [
                            { "Accounts": "Cash", "Debit": "$2,812", "Credit": "$3,140" },
                            { "Accounts": "Accounts Receivable", "Debit": "2,000", "Credit": "" },
                            { "Accounts": "Supplies", "Debit": "1,200", "Credit": "" },
                            { "Accounts": "Equipment", "Debit": "2,600", "Credit": "" },
                            { "Accounts": "Accounts Payable", "Debit": "", "Credit": "3,666" },
                            { "Accounts": "Unearned Service Revenue", "Debit": "", "Credit": "1,100" },
                            { "Accounts": "Owner's Capital", "Debit": "", "Credit": "8,000" },
                            { "Accounts": "Owner's Drawings", "Debit": "1,600", "Credit": "" },
                            { "Accounts": "Service Revenue", "Debit": "", "Credit": "2,480" },
                            { "Accounts": "Salaries and Wages Expense", "Debit": "3,200", "Credit": "" },
                            { "Accounts": "Utilities Expense", "Debit": "800", "Credit": "" },
                            { "Accounts": "Total", "Debit": "$14,212", "Credit": "$17,286" }
                        ]
                    },
                    "errors_info": "Each of the listed accounts has a normal balance in the general ledger. An examination of the ledger and journal reveals the following errors:",
                    "errors": [
                        "1. Cash received from a customer in payment of an account was debited for $850, and Accounts Receivable was credited for the same amount. The actual amount was for $350.",
                        "2. The purchase of supplies on account for $710 was recorded as a debit to Supplies for $710 and a credit to Accounts Payable for $710.",
                        "3. Services were performed on account for a client for $980. Accounts Receivable was debited for $980, and Service Revenue was credited for $980.",
                        "4. A debit posting to Salaries and Wages Expense of $900 was omitted.",
                        "5. The payment of Accounts Payable for $300 was credited to Cash for $300 and credited to Accounts Payable for $600.",
                        "6. The withdrawal of $600 cash for Sergel's personal use was debited to Salaries and Wages Expense for $600 and credited to Cash for $600."
                    ],
                    "requirements": [
                        "i. Prepare a correct trial balance."
                    ]
                },
                {
                    "question_number": "3 (a)",
                    "marks": "8+7=15",
                    "requirements": [
                        "i. Distinguish between general journal and special journals.",
                        "ii. Clarify the concept of subsidiary ledgers and control ledgers."
                    ]
                },
                {
                    "question_number": "3 (b)",
                    "content": "**Jeter Co.** uses a perpetual inventory system. Its sales are accounts receivable and an accounts payable subsidiary ledger. Balances related to the general ledger and the subsidiary ledgers for Jeter are indicated in the working papers presented below. Also following is a list of transactions for Jeter Co. for the month of January. Credit sales terms are 2/10, n/30. The cost of all merchandise sold was 60% of the sales price.",
                    "general_ledger_table": {
                        "title": "General Ledger",
                        "header": ["Account number", "Account Title", "January 1, Opening Balance"],
                        "rows": [
                            { "Account number": "101", "Account Title": "Cash", "January 1, Opening Balance": "$35,750" },
                            { "Account number": "112", "Account Title": "Accounts Receivable", "January 1, Opening Balance": "13,000" },
                            { "Account number": "115", "Account Title": "Notes Receivable", "January 1, Opening Balance": "39,000" },
                            { "Account number": "120", "Account Title": "Inventory", "January 1, Opening Balance": "18,000" },
                            { "Account number": "126", "Account Title": "Supplies", "January 1, Opening Balance": "900" },
                            { "Account number": "140", "Account Title": "Prepaid Insurance", "January 1, Opening Balance": "2,000" },
                            { "Account number": "157", "Account Title": "Equipment", "January 1, Opening Balance": "6,450" },
                            { "Account number": "158", "Account Title": "Accumulated Depreciation-Equipment", "January 1, Opening Balance": "1,250" },
                            { "Account number": "201", "Account Title": "Accounts Payable", "January 1, Opening Balance": "35,000" },
                            { "Account number": "301", "Account Title": "Owner's Capital", "January 1, Opening Balance": "78,700" }
                        ]
                    },
                    "schedule_accounts_receivable_table": {
                        "title": "Schedule of Accounts Receivable (From accounts receivable subsidiary ledger)",
                        "header": ["Customer", "January 1, Opening Balance"],
                        "rows": [
                            { "Customer": "R. Beltre", "January 1, Opening Balance": "$1,500" },
                            { "Customer": "D. Santos", "January 1, Opening Balance": "7,500" },
                            { "Customer": "S. Mahay", "January 1, Opening Balance": "4,000" }
                        ]
                    },
                    "schedule_accounts_payable_table": {
                        "title": "Schedule of Accounts Payable (From accounts payable subsidiary ledger)",
                        "header": ["Customer", "January 1, Opening Balance"],
                        "rows": [
                            { "Customer": "S. Meek", "January 1, Opening Balance": "$9,000" },
                            { "Customer": "R. Moses", "January 1, Opening Balance": "15,000" },
                            { "Customer": "D. Saito", "January 1, Opening Balance": "11,000" }
                        ]
                    },
                    "transactions_january": [
                        "Jan. 3 Sell merchandise on account to B. Corpora $3,600, invoice no. 510, and J. Revere $1,800, invoice no. 511.",
                        "7 Purchase merchandise from R. Moses $4,000 and D. Posey $2,200, terms 2/10, n/30.",
                        "8 Receive returns from S. Mahay $4,000 and B. Santos $2,000 after discount period has lapsed.",
                        "9 Pay freight on merchandise purchase $350.",
                        "9 Send checks to S. Meek for $9,000 less 2% cash discount, and to D. Saito for $11,000 less 1% cash discount.",
                        "10 Sales to D. Saito $20,100, terms 2/10, n/30, invoice no. 512.",
                        "10 Daily cash sales from January 1 to January 10 total $15,500. Make one journal entry for these sales.",
                        "12 Receive payment in full from R. Beltre $1,600, invoice no. 512, and to S. Mahay $900, invoice no. 513.",
                        "15 Pay rent of $1,000 for January.",
                        "16 Receive payment in full from B. Corpora and J. Revere less cash discounts.",
                        "17 Withdraws $800 cash by M. Jeter for personal use.",
                        "18 Post all entries to the subsidiary ledgers.",
                        "20 Purchase merchandise from D. Saito $15,000, terms 1/10, n/30; S. Meek $14,200, terms 2/19, n/30; and S. Gamel $1,500, terms n/30.",
                        "21 Pay $400 cash for supplies.",
                        "22 Returns $200 of merchandise to S. Meek and receive credit.",
                        "23 Daily cash sales from January 11 to January 20 total $20,100. Make one journal entry for these sales.",
                        "24 Issue a $4,000 note payable to D. Saito in full payment of balance due.",
                        "25 Receive payment in full from S. Mahay less cash discount.",
                        "28 Sell merchandise on account to R. Moses $2,750, invoice no. 514, and to R. Beltre $2,300, invoice no. 515.",
                        "29 Post all entries to the subsidiary ledgers.",
                        "30 Send checks to D. Saito and S. Meek for full payment less cash discounts.",
                        "30 Sell merchandise on account to B. Corpora $1,200, invoice no. 516, and to J. Revere $6,100, invoice no. 517.",
                        "30 Purchase merchandise from D. Saito $14,500, terms 1/10, n/30; D. Posey $3,200, terms n/30; and S. Gamel $4,600, terms 2/10, n/30.",
                        "31 Post all entries to the subsidiary ledgers.",
                        "31 Pay $200 cash for supplies.",
                        "31 Daily cash sales from January 21 to January 31 total $21,300. Make one journal entry for these sales.",
                        "31 Pay salaries $4,300 and office salaries $3,800."
                    ],
                    "requirements": [
                        "a. Record the January transactions in a sales journal, a single-column purchases journal, a cash receipts journal, a cash payments journal, and a two-column general journal.",
                        "b. Post the journals to the general ledger.",
                        "c. Prepare a trial balance at January 31, 2022, in the trial balance columns of the worksheet. Complete the worksheet using the following additional information:",
                        "i. Supplies at January 31 total $900.",
                        "ii. Insurance coverage relates to an October 31, 2022.",
                        "iii. Annual depreciation on the equipment is $1,500.",
                        "iv. Interest of $50 has accrued on the note payable.",
                        "d. Prepare a multiple-step income statement and an owner's equity statement for January and a classified balance sheet at the end of January.",
                        "e. Prepare and post adjusting and closing entries.",
                        "f. Prepare a post-closing trial balance, and determine whether the subsidiary ledgers agree with the control accounts in the general ledger."
                    ]
                },
                {
                    "question_number": "4 (a)",
                    "marks": "2+2+11=15",
                    "content": "The trial balance columns of the worksheet for **Warren Roofing** at March 31, 2022 are as follows:",
                    "trial_balance_worksheet_table": {
                        "title": "Warren Roofing Worksheet For the month ended March 31, 2022",
                        "header": ["Account Titles", "Trial Balance Dr.", "Trial Balance Cr."],
                        "rows": [
                            { "Account Titles": "Cash", "Trial Balance Dr.": "4,500", "Trial Balance Cr.": "" },
                            { "Account Titles": "Account Receivable", "Trial Balance Dr.": "3,200", "Trial Balance Cr.": "" },
                            { "Account Titles": "Supplies", "Trial Balance Dr.": "11,000", "Trial Balance Cr.": "" },
                            { "Account Titles": "Equipment", "Trial Balance Dr.": "25,000", "Trial Balance Cr.": "" },
                            { "Account Titles": "Accumulated Depreciation-Equipment", "Trial Balance Dr.": "", "Trial Balance Cr.": "1,250" },
                            { "Account Titles": "Accounts Payable", "Trial Balance Dr.": "", "Trial Balance Cr.": "2,400" },
                            { "Account Titles": "Unearned Service Revenue", "Trial Balance Dr.": "", "Trial Balance Cr.": "550" },
                            { "Account Titles": "Owner's Capital", "Trial Balance Dr.": "", "Trial Balance Cr.": "12,900" },
                            { "Account Titles": "Owner's Drawings", "Trial Balance Dr.": "1,100", "Trial Balance Cr.": "" },
                            { "Account Titles": "Service Revenue", "Trial Balance Dr.": "", "Trial Balance Cr.": "6,300" },
                            { "Account Titles": "Salaries and wages expense", "Trial Balance Dr.": "1,300", "Trial Balance Cr.": "" },
                            { "Account Titles": "Miscellaneous expense", "Trial Balance Dr.": "400", "Trial Balance Cr.": "" },
                            { "Account Titles": "Total", "Trial Balance Dr.": "23,500", "Trial Balance Cr.": "23,500" }
                        ]
                    },
                    "other_data": {
                        "1": "A physical count reveals only $480 of roofing supplies on hand.",
                        "2": "Depreciation for March is $150.",
                        "3": "Unearned Service Revenue earned at March 31.",
                        "4": "Accrued salaries are $1,200."
                    },
                    "requirements": [
                        "i. Enter the trial balance on a worksheet and complete the worksheet."
                    ]
                },
                {
                    "question_number": "5 (a)",
                    "marks": "3+12=15",
                    "content": "At the beginning of the current season on April 1, the ledger of **Gage Pro Shop** showed Cash $3,000, Inventory $4,000, and Owner's Capital $7,000. These transactions occurred during April 2022.",
                    "transactions_april": [
                        "Apr. 5 Purchased golf bags, clubs, and balls on account from Tiger Co. $1,200, terms 2/10, n/60, FOB shipping point.",
                        "7 Paid freight on Tiger Co. purchases $50.",
                        "9 Received credit from Tiger Co. for merchandise returned $100.",
                        "11 Sold merchandise on account to members $600, terms n/30.",
                        "12 Purchased golf shoes, sweaters, and other accessories on account from ClassicSportwear $450, terms 1/10, n/30.",
                        "14 Paid Tiger Co. in full.",
                        "17 Received credit from Classic Sportwear for merchandise returned $50.",
                        "20 Paid Classic Sportwear in full.",
                        "21 Sold goods to customers for clothing that did not fit properly $35.",
                        "30 Received payments on account from members $600."
                    ],
                    "instructions": "The chart of accounts for the pro shop includes Cash, Accounts Receivable, Inventory, Accounts Payable, Owner's Capital, Sales Revenue, Sales Returns and Allowances, Purchases, Purchase Returns and Allowances, Purchase Discounts, and Freight-In.",
                    "requirements": [
                        "i. Journalize the April transactions using a periodic inventory system."
                    ]
                },
                {
                    "question_number": "5 (b)",
                    "marks": "7+8=15",
                    "content": "On December 1, 2022, **Rodriquez Distributing Company** had the following account balances:",
                    "account_balances_dec_1": {
                        "header": ["Debit($)", "Credit($)"],
                        "Cash": { "Debit": "7,300", "Credit": "" },
                        "Accounts Receivable": { "Debit": "1,600", "Credit": "" },
                        "Inventory": { "Debit": "12,000", "Credit": "" },
                        "Supplies": { "Debit": "1,200", "Credit": "" },
                        "Equipment": { "Debit": "24,900", "Credit": "" },
                        "Accumulated Depreciation": { "Debit": "", "Credit": "4,500" },
                        "Accounts Payable": { "Debit": "", "Credit": "1,600" },
                        "Salaries and Wages Payable": { "Debit": "", "Credit": "900" },
                        "Owner's Capital": { "Debit": "", "Credit": "39,300" },
                        "Total": { "Debit": "47,000", "Credit": "47,000" }
                    },
                    "summary_transactions_december": [
                        "1. Dec. 6 Paid $1,600 for salaries and wages due employees, of which $600 is for December and $1,000 is for November salaries and wages payable.",
                        "2. Received $1,500 cash from customers in payment of account (no discount allowed).",
                        "3. Sold merchandise for cash $6,300. The cost of the merchandise sold was $4,100.",
                        "4. Purchased merchandise on account from Meridian Co. $9,600, terms 2/10, n/30.",
                        "5. Purchased supplies for cash $2,000.",
                        "6. Sold merchandise on account $15,000, terms 3/10, n/30. The cost of the merchandise sold was $10,000.",
                        "7. Paid salaries and wages $1,800.",
                        "8. Paid Meridian Co. in full, less discount.",
                        "9. Received data relating to full-year accounts, from customers billed on December 18.",
                        "10. **Adjustment data:**",
                        "a. Accrued salaries and wages payable were $840.",
                        "b. Depreciation was $200 per month.",
                        "c. Supplies on hand were $1,300."
                    ],
                    "instructions": "Journalize the December transactions using a perpetual inventory system.",
                    "requirements": [
                        "i. Post the December 1 balances in the ledger T-accounts and post all December transactions. Use these additional accounts: Cost of Goods Sold, Depreciation Expense, Salaries and Wages Expense, Sales Revenue, Sales Discounts, and Supplies Expense.",
                        "ii. Journalize and post adjusting entries.",
                        "iii. Prepare an adjusted trial balance.",
                        "iv. Prepare an income statement and an owner's equity statement for December and a classified balance sheet at December 31."
                    ]
                },
                {
                    "question_number": "6 (a)",
                    "marks": "6+5=11",
                    "requirements": [
                        "i. Briefly explain the attributes of cash control systems.",
                        "ii. State the steps in preparing a bank reconciliation statement."
                    ]
                },
                {
                    "question_number": "6 (b)",
                    "marks": "5+10=15",
                    "content": "**Elkins Products Co.** has a balance of as December 31, 2022, of Tk. 11,772.56, the cash account for the company as of this date shows an overdraft of Tk. 542.24. In reconciling the statement with the books, the following facts are discovered:",
                    "reconciliation_facts": [
                        "1. The cash balance includes Tk. 600 representing a petty cash fund. When the cash on hand is counted, only Tk. 517 is found.",
                        "2. The cash balance includes Tk. 800 representing a change cash fund. Inspection of the petty cash fund reveals cash of Tk. 750 on hand and a replenishing check drawn on December 31 for Tk. 100.",
                        "3. A check from S. Paul for Tk. 57, a life insurance, deposited on December 31, was returned by the bank on January 3 because it was a **NSF check**.",
                        "4. The bank statement for December 2022 shows a bank service charge of Tk. 11.20, and a check for Tk. 200 drawn by Elkins Produce and incorrectly cleared through this account.",
                        "5. The bank statement does not show receipts of December 31 of Tk. 3,330, which were deposited on January 3.",
                        "6. Checks outstanding were found to be Tk. 18,610. These include the check transferred to the petty cash fund and the replenishing check from S. Paul's payment to J. Minor, who notified Elkins's company that he had the original check and had been sent a second one, the company stopping payment on the first check."
                    ],
                    "requirements": [
                        "i. Prepare a bank reconciliation statement, using the form in which both bank and book balances are brought to a corrected cash balance.",
                        "ii. Give the correcting entries for Elkins Products required by the foregoing."
                    ]
                }
            ]
        }
    }
};
