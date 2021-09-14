/*
###########################################################################################
Project:        server-api.js
Description:    Simple implementation for backend users login api 
Auhthor:        Bar Polyak
###########################################################################################
*/
/* --------------------------------------- Modules Imports --------------------------------------- */
const config = require('./config');
const cors = require('cors');
const express = require('express');
const db = require('./server-users');
const session = require('express-session');
const cookieParser = require('cookie-parser');

/* --------------------------------------- App Setup --------------------------------------- */
const app = express();
app.use(cors({
    origin : config.client.origin,
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser(config.server.cookieSecret));
app.use(session({
    secret: config.server.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60 * 60 * 1000 * 24,    //24 hr
        sameSite: true, 
    },     
}));

// Default cookie settings
const default_cookie = {
    maxAge: 60 * 60 * 1000 * 24, // 24 hr
    httpOnly: true,
    secure: true,
    sameSite: true,
};

/* ---------------------------------------------------------------------------
    Function: 
        Authentication checker
    Description:
        - validating logged users via session user id storage
    Type:
        POST
    Args: 
        - None
    Return: 
        - boolean - User logged session state
   --------------------------------------------------------------------------- */

app.post("/api/auth", (req, res) => {
    const logged = req.session.logged;
    res.end(JSON.stringify({state: logged}));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Login Validator
    Description:
        - validating user login data
        - setting up cookie and session storage for logged users
    Type:
        POST
    Args: 
        - string - user email
        - string - user password
    Return: 
        - boolean - Login status
        - string - error text
   --------------------------------------------------------------------------- */
app.post("/api/login", async(req, res) => {
    console.log("[*] login request");
    // get user inputs
    const data = {
        email: req.body.email,
        psw: req.body.psw
    };
    const result = await db.userLogin(data);
    if(result.state) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');  // important for cookie/session
        res.cookie('logged', true, default_cookie);
        req.session.logged = true;
    }
    res.end(JSON.stringify(result));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Register
    Description:
        - validating user data
        - adding user to db
        - sending verification mail
        - setting up cookie and session storage for user id
    Type:
        POST
    Args: 
        - string - user email
        - string - user password
        - string - confirm password
    Return: 
        - boolean - Register status
        - string - error text
   --------------------------------------------------------------------------- */

app.post("/api/register", async(req, res) => {
    console.log("[*] register request");
    // get user inputs
    const data = {
        email: req.body.email,
        psw: req.body.psw,
        cpsw: req.body.cpsw
    };
    const result = await db.userRegister(data);
    if(result.state) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');  // important for cookie/session
        res.cookie('uid', result.uid, default_cookie);
        req.session.uid = result.uid;
    }
    res.end(JSON.stringify({state:result.state, error: result.error}));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Forgot Password
    Description:
        - update verification token
        - send reset password to user mail
    Type:
        POST
    Args: 
        - string - user email
    Return: 
        - boolean - Register status
        - string - error text
   --------------------------------------------------------------------------- */

app.post("/api/forgot", async (req, res) => {
    console.log("[*] forgot password request");
    // get user inputs
    const email = req.body.email;
    const result = await db.sendResetMail(email);
    res.end(JSON.stringify(result));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Reset Password
    Description:
        - validating passwords
        - encrypt password
        - update password in db to new password
    Type:
        POST
    Args: 
        - string - new password
        - string - confirm new password
    Return: 
        - boolean - Reset state
        - string - error text
   --------------------------------------------------------------------------- */
app.post("/api/reset", async(req, res) => {
    console.log("[*] reset request");
    const uid = req.session.uid;
    // get user inputs
    const data = {
        uid: uid,
        psw: req.body.psw,
        cpsw: req.body.cpsw
    };
    const result = await db.resetPassword(data);
    res.end(JSON.stringify(result));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Token Verification
    Description:
        - finding token user
        - validating user token, check for expired token
        - update user state to 'Active' in db
        - setting up cookie and session storage for user id
    Type:
        POST
    Args: 
        - string - token
    Return: 
        - boolean - verification state
        - string - error text
   --------------------------------------------------------------------------- */
app.post("/api/token", async (req, res) => {
    console.log("[*] checking token");
    // check code in db
    const code = req.body.token.substring(1);
    const result = await db.validateToken(code);
    let valid = false;
    if(result.state) {
        valid = true;
        res.cookie('uid', result.uid, default_cookie);
        res.setHeader('Access-Control-Allow-Credentials', 'true');  // important for cookie/session
        req.session.uid = result.uid;
    } 
    res.end(JSON.stringify({state: valid}));
});


/* ---------------------------------------------------------------------------
    Function: 
        User Resend Verification Mail
    Description:
        - finding user
        - updating to new token
        - resending verfication mail to user email
    Type:
        POST
    Args: 
        - None
    Return: 
        - boolean - resend verification state
        - string - error text
   --------------------------------------------------------------------------- */
app.post("/api/resend-confirm", async(req, res) => {
    console.log("[*] resending verification mail");
    // check code in db
    console.log(req.session.uid);
    const result = await db.sendVerifyMail(req.session.uid);
    res.end(JSON.stringify(result));
});

/* ---------------------------------------------------------------------------
    Function: 
        User Confirm Password Reset Mail
    Description:
        - validate token
        - redriect to reset password page
    Type:
        GET
    Args: 
        - string - token
    Return: 
        - boolean - token verification state
        - string - error text
   --------------------------------------------------------------------------- */
app.get("/reset-password/:token", async(req, res) => {
    console.log("[*] reset code");
    // get user code
    const {token} = req.params;
    // check code in db
    const result = await db.validateToken(token);
    if(result.uid != null) {
        res.cookie('uid', result.uid, default_cookie);
        req.session.uid = result.uid;
        if(result.state) {
            // redirect to password reset page
            res.redirect(config.client.origin  + '/reset-password/:' + token);
        } else {
            res.redirect(config.client.origin  + '/login?token=expired');
        }
    }else {
        res.redirect(config.client.origin  + '/login');
    }
});

/* ---------------------------------------------------------------------------
    Function: 
        User Confirm Verification Mail
    Description:
        - validate token
        - redriect to login page
    Type:
        GET
    Args: 
        - string - token
    Return: 
        - boolean - token verification state
        - string - error text
   --------------------------------------------------------------------------- */
app.get("/confirm/:uniqueString", async(req, res) => {
    console.log("[*] confirming verification code");
    // get user code
    const {uniqueString} = req.params;
    // check code in db
    const result = await db.validateToken(uniqueString);
    if(result.uid != null) {
        res.cookie('uid', result.uid, default_cookie);
        req.session.uid = result.uid;
        if(result.state) {
            res.redirect(config.client.origin  + '/login');
        } else {
            res.redirect(config.client.origin  + '/login?token=expired');
        }
    } else {
        res.redirect(config.client.origin  + '/login');
    }
});

/* ---------------------------------------------------------------------------
    Function: 
        Server Main Listener
    Description:
        - listen on config port
   --------------------------------------------------------------------------- */
app.listen(config.server.port, ()=> console.log("[*] Server is listening on port: " + config.server.port));