# **E-sential Project**

## **Welcome to E-sential where your financial prosperity is essential to us!**

Visit Live Site [Here](#)

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
    - POST /api/auth/login -- Login User
    - POST /api/user/signup -- Create New User

- User
    - GET /api/user/ -- Get User
    - PUT /api/user/edit -- Edit User
    - PUT /api/user/edit/password -- Edit Password
    - DELETE /api/user/ -- Delete User

- Bank Info
    - POST /api/bank_info/ -- Create new bank info
    - GET /api/bank_info/info -- Get Bank info
    - PUT /api/bank_info/edit -- Edit Banking info
    - DELETE /api/bank_info/ -- Delete Banking info

- Stock Info
    - POST /api/stock_info/ -- Create new stock info
    - GET /api/stock_info/info -- Get Stock info
    - PUT /api/stock_info/edit -- Edit Stock info
    - DELETE /api/stock_info/ -- Delete Stock info

- Plan
    - POST /api/plan/ -- Create a new plan
    - GET /api/plan/info -- Get Plan
    - DELETE /api/plan/ -- Delete Plan

- Watch List 
    - POST /api/watch_list/ -- Create a new Watch List
    - GET /api/watch_list/list -- Get Watch List
    - DELETE /api/watch_list/ -- Delete Watch List


# **MVP** 

- Banking Info
- Stock Market
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