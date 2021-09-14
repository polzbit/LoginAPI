# NodeJs Login API

## Overview
An api service to handle users login, registration, send verification mails, encrypt data using SHA512 hash and a random salt token, \
safe store of session data, safe store of cookie data and handle reset password requests.\
front built using React.

<p align="center">
    <img height="400" width="500" src="https://raw.githubusercontent.com/polzbit/LoginAPI/main/Front/src/img/demo.png" />
</p>

## Prerequirement

* [Mongodb](https://www.mongodb.com/)


# Getting Started

* In config file `Back/config.js` change `config.server.sessionSecret`, `config.server.cookieSecret` and `config.mailer.settings` to your settings.


* Create database with `users` collection, you can use `createDb` and `createCollection` functions from `dbController.js`

```
const url = "mongodb://127.0.0.1:27017/";

/* Create new database via mongodb */
const createDb = async(dbName) => {
    const dbUrl = url + dbName;
    const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => { console.log(err); });
    client.close();
} 

/* Add new collection to db */
const createCollection = async(dbName, collectionName) =>{
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => { console.log(err); });
    const res = await client.db(dbName).createCollection(collectionName);
    client.close();
}

```

## How to built and run node server

`cd` to `Back` folder and run the following to install project dependencies:

### `npm install`

to start project run:

### `node server-api.js`

## How to built and run react client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`cd` to `Front` folder and run the following to install project dependencies:

### `npm install`

to start project run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

