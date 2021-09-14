/*
###########################################################################################
Project:        server-mailer.js
Description:    Simple mail service module
Auhthor:        Bar Polyak
Notes:
    * To use Gmail with nodemailer, you’ll have to enable the access for less secure apps, 
    otherwise it won’t send any emails.
###########################################################################################
*/
/* --------------------------------------- Modules Imports --------------------------------------- */
var nodemailer = require('nodemailer');
const config = require('./config');

/* --------------------------------------- App Setup --------------------------------------- */

// Default mail settings
const transporter = nodemailer.createTransport(config.mailer.settings);

/* ---------------------------------------------------------------------------
    Function: 
        Send Verification Mail
    Description:
        - send verification mail to user email
    Args: 
        - string - email address
        - string - token
    Return: 
        None
   --------------------------------------------------------------------------- */
const sendConfirmationMail = (target, confirmationCode) => {
    const mailOptions = {
        from: 'info@domain.com',
        to: target,
        subject: 'Please confirm your account',
        html: '<h1>Email Confirmation</h1>    \
        <h2>Hello</h2>                \
        <p>Please confirm your email by clicking on the following link</p>     \
        <a href='+ config.server.origin +'/confirm/'+ confirmationCode +'> Click here</a>             \
        </div>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

/* ---------------------------------------------------------------------------
    Function: 
        Send Reset Mail
    Description:
        - send reset mail to user email
    Args: 
        - string - email address
        - string - token
    Return: 
        None
   --------------------------------------------------------------------------- */
const sendResetMail = (target, confirmationCode) => {
    const mailOptions = {
        from: 'info@domain.com',
        to: target,
        subject: 'Reset account password',
        html: '<h1>Reset Password</h1>    \
        <h2>Hello</h2>                \
        <p>You can reset your password on the following link</p>     \
        <a href='+ config.server.origin +'/reset-password/'+ confirmationCode +'> Click here</a>             \
        </div>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

/* --------------------------------------- Export Functions --------------------------------------- */
module.exports = {
    sendConfirmationMail, 
    sendResetMail
};