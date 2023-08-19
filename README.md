# placement_cell
placement cell website using nodejs
This App built using EJS, MongoDB, ExpressJs, NodeJs and PassportJS


Pages
- Sign Up and Sign In only for employees
- List of students + add new student (this is similar to adding and viewing posts in codeial)
- List of Interviews + form to create an interview (with date)
- Allocate a student to an interview
- Select an interview to view the list of all students and mark a result status from the list
page itself

- External Jobs List:
- A page which fetches real available jobs in India for react/node.js. Find and
use open APIs .

- Download a complete CSV of all the data with the following columns:
- Student id, student name, student college, student status, DSA Final Score, WebD Final
Score, React Final Score, interview date, interview company, interview student result
- A student can have multiple entries based on the interviews she/he has given.
------------------------------------------------------------------------------------------------------------

Steps to setup project:-

1.cd folder
2.npm init
----
npm is the world's largest Software Registry. The registry contains over 800,000 code packages. Open-source developers use npm to share software.
This npm command is used for installing the third party modules in our current directory.

3.npm install express
----
Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.

4.npm install ejs
----
Embedded JavaScript templating.

5.npm install nodemon
----
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

6.Install Homebrew
----
Homebrew installs the stuff you need that Apple (or your Linux system) didn’t.
/usr/bin/ruby -e "$(curl -fsSL
https://raw.githubusercontent.com/Homebrew/install/maste
r/install)"
2. Tap the MongoDB Homebrew Tap
brew tap mongodb/brew
3. Install MongoDB
brew install mongodb-community@4.0
4. Run MongoDB
brew services start mongodb
5. Connect and Use MongoDB
mongo

#7. Use the migrated distribution from custom tap
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
8.npm install mongodb
9.npm install mongoose
----
MongoDB is a document-oriented NoSQL database, while Mongoose is an Object Data Modeling (ODM) library for Node. js that provides a higher-level abstraction layer on top of MongoDB, allowing developers to define data models using a schema-based approach.

10.npm install express-ejs-layouts
----
This is where EJS Layouts come in and help us create projects that are easier to maintain.
And for Partials, they are a common templating concept where the idea is to create reusable files that can be reused.

11.npm install cookie-parser
----
Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.


V4 migration guide
To migrate the library from V3 to V4, re-install the dependencies.

If you are using npm

npm uninstall connect-mongo
npm uninstall @types/connect-mongo
npm install connect-mongo
12.npm uninstall connect-mongo
13.npm i connect-mongo@3
14.npm install node-sass-middleware
----
Recompile .scss or .sass files automatically for connect and express based http servers.

15.npm install passport
----
Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

16.npm install passport-local
Passport strategy for authenticating with a username and password.

This module lets you authenticate using a username and password in your Node.js applications. By plugging into Passport, local authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.


other:
bcrypt,onnect-flash(notification),rotating-file-stream,morgan,node-sass-middleware
