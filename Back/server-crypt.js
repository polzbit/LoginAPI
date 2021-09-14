/*
###########################################################################################
Project:        server-crypt.js
Description:    Simple module to hash and encrypt data
Auhthor:        Bar Polyak
###########################################################################################
*/
/* --------------------------------------- Modules Imports --------------------------------------- */

const crypto = require('crypto');
/* --------------------------------------- App Setup --------------------------------------- */

/* ---------------------------------------------------------------------------
    Function: 
        Token Generator
    Description:
        - Generate random token
    Args: 
        - None
    Return: 
        - string - token
   --------------------------------------------------------------------------- */
const generateToken = () => {
    return {token:crypto.randomBytes(48).toString('hex'), date: Date.now()};
}

/* ---------------------------------------------------------------------------
    Function: 
        Salt Generator
    Description:
        - Generate random salt token
    Args: 
        - None
    Return: 
        - string - salt token
   --------------------------------------------------------------------------- */
const generateSalt = rounds => {
    if (rounds >= 15) {
        throw new Error(`${rounds} is greater than 15,Must be less that 15`);
    }
    if (typeof rounds !== 'number') {
        throw new Error('rounds param must be a number');
    }
    if (rounds == null) {
        rounds = 12;
    }
    return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
};

/* ---------------------------------------------------------------------------
    Function: 
        Password Hasher
    Description:
        - encrypt password using SHA512 and salt
    Args: 
        - string - plain text password
        - string - salt token
    Return: 
        - object - 
            - string - salt
            - string - password hash
   --------------------------------------------------------------------------- */
const hasher = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hashedpassword: value
    };
};

/* ---------------------------------------------------------------------------
    Function: 
        Password Encryptor
    Description:
        - validating password
        - validating salt
        - encrypt password using SHA512 and salt
    Args: 
        - string - plain text password
        - string - salt token
    Return: 
        - object - 
            - string - salt
            - string - password hash
   --------------------------------------------------------------------------- */
const hash = (password, salt) => {
    if (password == null || salt == null) {
        throw new Error('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
    }
    return hasher(password, salt);
};

/* ---------------------------------------------------------------------------
    Function: 
        Password Compare
    Description:
        - compare plain text password with hashed password
    Args: 
        - string - plain text password
        - string - password hash data
    Return: 
        - boolean - password verification
   --------------------------------------------------------------------------- */
const compare = (password, hash) => {
    if (password == null || hash == null) {
        throw new Error('password and hash is required to compare');
    }
    if (typeof password !== 'string' || typeof hash !== 'object') {
        throw new Error('password must be a String and hash must be an Object');
    }
    let passwordData = hasher(password, hash.salt);
    if (passwordData.hashedpassword === hash.hashedpassword) {
        return true;
    }
    return false
};

/* --------------------------------------- Export Functions --------------------------------------- */
module.exports = {
    generateToken,
    generateSalt,
    hash,
    compare
}