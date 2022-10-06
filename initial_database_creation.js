const AppDAO = require('./DAO/dao')
const RolesRepository = require("./DAO/roles_repository")
const UserRepository = require("./DAO/user_repository")
const UserRolesRepository = require("./DAO/user_roles_repository")

const GeneratePassword = require("./electron/security/generatePassword")

const dao  = new AppDAO('./database.sqlite3')
var password = 'password123'
var passwordObj = GeneratePassword(password);

const superUser = { username: 'superuser', full_name: 'Super User', password_hash: passwordObj.hash_password, password_salt: passwordObj.salt }
const userRepository = new UserRepository(dao)
const rolesRepository = new RolesRepository(dao)
const userRolesRepository = new UserRolesRepository(dao)

userRepository.createTable()
userRolesRepository.createTable()
.then(() => userRepository.create(superUser.username, superUser.full_name, superUser.password_hash, superUser.password_salt))
.then(() => rolesRepository.createTable())
.then(() => userRolesRepository.create(1, 1))
.then(() => {

    const roles = [
    {
        role_name: 'System Administrator'
    },
    {
        role_name: 'Administrator'
    },
    {
        role_name: 'User'
    }
    ]

    return Promise.all(roles.map((role) => {
        return rolesRepository.create(role.role_name);
    }))
})
.catch((err) => {
    console.log('Error: ')
    console.log(JSON.stringify(err))
})