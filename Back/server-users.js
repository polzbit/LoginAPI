/* --------------------------------------- Modules Imports --------------------------------------- */
const users = require('./mongodb/users_collection');
const mongoId = require('mongodb').ObjectID;
const scrypto = require('./server-crypt');
const mailer = require('./server-mailer');

/* ---------------------------------------------------------------------------
    Function: 
        Token Validator
    Description:
        - finding user
        - validating user token
        - updating user state to 'Active' if needed
    Args: 
        - string - token
    Return: 
        - string - uid
        - boolean - token verification state
        - string - error text
   --------------------------------------------------------------------------- */
const validateToken = async(code) => {
    const tokenCode = code;
    // find uid
    let error = 'uid not found';
    let state = false;
    try {
        let query = { 'confirmCode.token': tokenCode };
        const proj = { projection: { _id: 1, confirmCode: 1 }};
        const findResults = await users.find(query, proj);
        if(!findResults.length) {
            return {state: state, error: error};
        } 
        error = 'token expired';
        if(findResults[0].confirmCode.date - Date.now() > 60 * 60 * 1000 * 24 ) {    // token for 24 hr
            return {state: state, error: error};
        }
        error = 'token not valid';
        if(findResults[0].confirmCode.token !== tokenCode ) {
            return {state: state, error: error};
        }
        error = '';
        state = true;
        // update user status
        query = { _id: findResults[0]._id};
        const newvalues = { $set: {status: "Active" } };
        const updateResults = await users.updateOne(query, newvalues);
        console.log('[*] user confirmed');
    }
    catch(err) {
        console.log(err);
    }
    finally {
        return {state: state, error: error};
    }
}

/* ---------------------------------------------------------------------------
    Function: 
        Reset Password
    Description:
        - validate passwords
        - encrypt password
        - update new encrypted password to db
    Args: 
        - string - password
        - string - confirm password
    Return: 
        - boolean - reset password state
        - string - error text
   --------------------------------------------------------------------------- */
const resetPassword = async(data) => {
    const { uid, psw, cpsw } = data;
    const o_uid = new mongoId(uid);
    let valid = false;
    let error = 'invalid password';
    if(!validatePsw(psw, cpsw)) {
        return {state: valid, error: error};
    }
    error = 'uid not found';
    try {
        const query = { _id: o_uid };
        const proj = { projection: { _id: 0, psw: 1 }};
        const findResults = await users.find(query, proj);
        if(!findResults.length) {
            return {state: valid, error: error};
        }
        // change passsword
        valid = true;
        error = '';
        let salt = scrypto.generateSalt(10);
        const newvalues = { $set: {psw: await scrypto.hash(psw, salt) } };
        const updateResults = await users.updateOne(query, newvalues);
        console.log('[*] password changed');
    } catch(err) {
        console.log(err);
    } finally {
        return {state: valid, error: error};
    }
}

/* ---------------------------------------------------------------------------
    Function: 
        Reset Password Link Sender
    Description:
        - validate email
        - updating token
        - sending reset link
    Args: 
        - string - user email
    Return: 
        - boolean - mail sender state
        - string - error text
   --------------------------------------------------------------------------- */
const sendResetMail = async(email) => {
    let valid = false;
    let error = 'invalid email';
    const userEmail = email;
    // validate email
    if(!validateEmail(userEmail)) {
        return {state: valid, error: error};
    }
    error = 'email not found';
    try {
        const query = { email: userEmail };
        const proj = { projection: { _id: 0, status: 1 }};
        const findResults = await users.find(query, proj);
        if(!findResults.length) {
            return {state: valid, error: error};
        }
        error = 'verificaion pending';
        if(findResults[0].status === 'Pending') {
            return {state: valid, error: error};
        }
        error = '';
        valid = true;
        // send reset link to email
        let token = await scrypto.generateToken();
        var newvalues = { $set: {confirmCode: token} };
        const updateResults = await users.updateOne(query, newvalues);
        console.log('[*] user reset');
        // send reset link
        mailer.sendResetMail(userEmail, token.token);
    } catch(err) {
        console.log(err);
    } finally {
        return {state: valid, error: error};
    }
}

/* ---------------------------------------------------------------------------
    Function: 
        User Login Validator
    Description:
        - validate email
        - validate password
    Args: 
        - string - user email
        - string - user password
    Return: 
        - boolean - login state
        - string - error text
   --------------------------------------------------------------------------- */
const userLogin = async(data) => {
    const { email, psw } = data;
    let valid = false;
    let error = 'invalid email';
    // validate email
    if(!validateEmail(email)) {
        return {state: valid, error: error};
    }
    error = 'Email not registerd';
    try {
        const query = { email: email };
        const proj = { projection: { _id: 0, psw: 1, status: 1 }};
        const findResults = await users.find(query, proj);
        if(!findResults.length) {
            return {state: valid, error: error};
        }
        error = 'wrong password';
        // check passsword
        if(!await scrypto.compare(psw, findResults[0].psw)) {
            return {state: valid, error: error};
        }
        error = 'verificaion pending';
        if(findResults[0].status === 'Pending') {
            return {state: valid, error: error};
        }
        console.log("[*] user verified, login successfully.")
        error = '';
        valid = true;

    } catch(err) {
        console.log(err);
    } finally {
        return {state: valid, error: error};
    }
}

/* ---------------------------------------------------------------------------
    Function: 
        User Register
    Description:
        - validate email
        - validate passwords
        - encrypt password
        - adding user data to db
        - send verfication mail
    Args: 
        - string - user email
        - string - user password
        - string - confirm password
    Return: 
        - string - new uid
        - boolean - register state
        - string - error text
   --------------------------------------------------------------------------- */
const userRegister = async(data) => {
    const { email, psw, cpsw } = data;
    let valid = false;
    let error = 'invalid email';
    // validate email
    if(!validateEmail(email)) {
        return {state: valid, error: error};
    }
    error = 'Email exists';
    try {
        const query = { email: email };
        const proj = { projection: { _id: 0, psw: 1 }};
        const findResults = await users.find(query, proj);
        if(findResults.length) {
            // email exists
            return {state: valid, error: error};
        }
        error = 'invalid password';
        if(!validatePsw(psw, cpsw)) {
            return {state: valid, error: error};
        }
        // case email and psw are valid
        error = '';
        valid = true;
        // get salt
        const salt = await scrypto.generateSalt(10);
        // hash psw
        const usr_data = {
            email: email,
            psw: await scrypto.hash(psw, salt),
            status: 'Pending',
            confirmCode: await scrypto.generateToken()
        }
        // insert data
        const insertResults = await users.insert(usr_data);
        console.log("[*] user inserted");
        // send confirmation mail
        mailer.sendConfirmationMail(usr_data.email, usr_data.confirmCode.token);
    } catch(err) {
        console.log(err);
    } finally {
        return {state: valid, error: error};
    }
}

/* ---------------------------------------------------------------------------
    Function: 
        User Verification Link Sender
    Description:
        - finding user
        - updating token
        - send verfication mail
    Args: 
        - string - uid
    Return: 
        - boolean - mail sender state
        - string - error text
   --------------------------------------------------------------------------- */
const sendVerifyMail = async(uid) => {
    const userId = uid;
    const o_uid = new mongoId(userId);
    let valid = false;
    let error = 'uid not found';
    try {
        const query = { _id: o_uid };
        const proj = { projection: { _id: 0, psw: 1, email: 1 }};
        const findResults = await users.find(query, proj);
        if(!findResults.length) {
            // uid not exists
            return {state: valid, error: error};
        }
        error = '';
        valid = true;
        // update to new token
        let token = await scrypto.generateToken();
        var newvalues = { $set: {confirmCode: token} };
        const updateResults = await users.updateOne(query, newvalues);
        console.log('[*] token changed');
        // send confirm
        mailer.sendConfirmationMail(findResults.email, token.token);
    } catch(err) {
        console.log(err);
    } finally {
        return {state: valid, error: error};
    }
}
/* ---------------------------------------------------------------------------
    Function: 
        Email Address Validator
    Description:
        - Validating email address
    Args: 
        - string - email
    Return: 
        - boolean - email verification
   --------------------------------------------------------------------------- */
   const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* ---------------------------------------------------------------------------
    Function: 
        Password Validator
    Description:
        - Validating passwords
    Args: 
        - string - password
        - string - confirm password
    Return: 
        - boolean - password verification
   --------------------------------------------------------------------------- */
const validatePsw = (psw, cpsw) => {
    let valid = false;
    if(typeof psw === 'string' && psw === cpsw && psw.length > 2) {
        valid = true;
    }
    return valid;
}

/* --------------------------------------- Export Functions --------------------------------------- */
module.exports = {
    validateToken,
    resetPassword,
    sendResetMail,
    sendVerifyMail,
    userLogin,
    userRegister
}

