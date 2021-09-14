
let config = {};

config.server = {};
config.client = {};
config.mailer = {};
config.mongo = {};

config.origin = 'http://localhost'

config.server.port = 5000;
config.server.origin = config.origin + ':' + config.server.port;
config.server.sessionSecret = '<SESSION-SECRET-GOES-HERE>';
config.server.cookieSecret = '<COOKIE-SECRET-GOES-HERE>';

config.client.port = 3000;
config.client.origin = config.origin + ':' + config.client.port;

/* To use Gmail with nodemailer, you’ll have to enable the access for less secure apps, 
    otherwise it won’t send any emails. */
config.mailer.settings = {
    service: 'gmail',
    auth: {
      user: '<GMAIL-ACCOUNT>@gmail.com',
      pass: '<GMAIL-PASSWORD>'
    }
}

config.mongo.db = 'mydb';
config.mongo.users = 'users';

module.exports = config;