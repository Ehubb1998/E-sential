# **E-sential Project**

## **Welcome to E-sential where your financial prosperity is essential to us!**

## **About**



_Ehubb's first Full-Stack Application!_

---

## **Brief Explanation of The App** 

- This app will help users organize their finances and is a beginners's guide to investing on the stock market. If you are a beginner to investing, there is a visual tutorial on what stocks are, what does it mean to invest, how to invest, and most importantly, helps provide a custom plan to help you find money to invest. This is the perfect app for getting you a custom plan for financial freedom!

---

## **Technologies Used**

- **Front-End**

    - HTML5
    - CSS3
    - JavaScript
        - React
        - Redux

- **Back-End**

    - PostgreSQL
    - Python
        - Flask

- **API'S**

    - IEX Cloud

---

## **Discussion of two features that show off technical abilities**

- A more advanced and secure form of user authentication was a great way to elevate the app. The sign up form has validations for each individual input field and requires the user to have a strong password. Once logged in, the app knows who you are and greets you.


## **Backend Routes**

- Authentication
    - /api/auth/ -- Authenticate User
    - POST /api/auth/login -- Login User
    - /api/auth/logout -- Logout User

- User
    - POST /api/user/signup -- Create New User
    - GET /api/user/:userId -- Get User
    - PUT /api/user/:userId -- Edit User
    - DELETE /api/user/:userId -- Delete User

- Bank Info
    - GET /api/bank_info/:id -- Get Bank info
    - PUT /api/bank_info/:id -- Edit Banking info

- Stock Info
    - POST /api/stock_info/ -- Create new stock info
    - GET /api/stock_info/:id -- Get Stock info
    - PUT /api/stock_info/:id -- Edit Stock info
    - DELETE /api/stock_info/:id -- Delete Stock info

- Plan
    - GET /api/plan/:id -- Get Plan
    - POST /api/plan/ -- Create a new plan
    - DELETE /api/plan:id -- Delete Plan

- Watch List 
    - GET /api/watch_list/:id -- Get Watch List
    - POST /api/watch_list/ -- Create a new plan
    - DELETE /api/watch_list/:id -- Delete Plan


# **MVP** 

- Banking Info
- Stock Market
- Stock Tutorial
- Custom Planning
- Watch List

---

# **Features**

- Sign Up / Log In
- Can setup and organize financial information
- Tutorial on the Stock Market and investing
- Custom plan on how to invest
- View stocks
- Stock Watch List

# **Models**

- User
- BankInfo
- StockInfo
- Plan
- WatchList

# **Components**

- NavBar Component
- Splash Page Component
    - Stock Market Component
- *Once Logged In
- Homepage Component
    - Banking Component
    - Stock Market Component
---