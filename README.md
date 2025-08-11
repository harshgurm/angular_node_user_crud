# Customer Management System using Angular and Node
Developed a Customer Management System that allows authenticated users to create, update, and delete customer records. New users are required to sign up and log in, as only authenticated users can access the CMS.

# Key Features
- Password encryption
- JWT token
- Custom password validation
- Message Service to display Success and Error message
- Auth Gaurd

# How to Setup the Project?
- Run the database/user_management.sql file to create the database and required tables.
- Create a .env file and add the following variables:
  -  **HOST**= database url
  - **USER**= database username
  - **PASSWORD**= database password
  - **DATABASE**= database name
  - **KEY**= It will use that string to encrypt the password and if you are not sure add a random string. 
- Run **npm install** in following folders to download all the necessary packages:
  - /server
  - /user_management

# How to run the project?
- run **ng serve -o** under the user_management folder
- run **npx nodemon server** under the server folder
