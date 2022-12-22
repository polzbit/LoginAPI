# NodeJs Login API

## Overview

An api service to handle users login, registration, send verification mails, reset user password \
and Joi verifications on both ends, data is hashed using salt key and sha512 algo and store on Mongodb, \
server is built using TypeScript and Express framework .\
front is built using TypeScript React.\
tests using jest library.

<p align="center">
    <img height="400" width="500" src="https://raw.githubusercontent.com/polzbit/LoginAPI/main/demo.png" />
</p>

## Pre requirement

- [Mongodb](https://www.mongodb.com/)

# Getting Started

- Add the following env variables to backend:

```
MONGO_DB =
MONGO_URL =
ORIGIN = http://localhost
PORT = 5000
CLIENT_PORT = 3000
COOKIE_SECRET =
SESSION_SECRET =
MAILER_SERVICE =
MAILER_USERNAME =
MAILER_PASSWORD =
JWT_SECRET =
```

## How to run node server

go to `Back` folder and run the following to install project dependencies:

### `npm install`

to start server run:

### `npm start`

## How to run react client

go to `Front` folder and run the following to install project dependencies:

### `npm install`

to start project run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run coverage`

Launches the test runner in the interactive watch mode and show coverage report.\
