var aes256 = require("aes256");

// the secret key used for encrypting and decrypting messages
var secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

// returns the encrypted text
export const to_Encrypt = (text) => {
    var encrypted = aes256.encrypt(secret_key, text);
    return encrypted;
};

export const to_Decrypt = (cipher, username) => {
    // welcome message is not decrypted
    if (cipher.startsWith("Welcome")) {
        return cipher;
    }
    // username is not decrypted
    if (cipher.startsWith(username)) {
        return cipher;
    }
    // decryped message is returned
    var decrypted = aes256.decrypt(secret_key, cipher);
    return decrypted;
};