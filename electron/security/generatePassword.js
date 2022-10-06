const { createHash } = require('crypto');

function GetRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for( var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function GeneratePassword(password) {
    var salt = GetRandomString(20);
    var hash_password = createHash('sha256').update(password + salt).digest('hex');
    return { salt, hash_password};
}

module.exports = GeneratePassword;