import bcrypt from 'bcryptjs';

const GetRandomString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for( var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const GeneratePassword = (password) => {
    var salt = GetRandomString(20);
    var hash_password = bcrypt.hashSync(password + salt)
    return { salt, hash_password};
}

export default GeneratePassword;