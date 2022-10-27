const AppDAO = require("./dao/dao");
const RolesRepository = require("./dao/roles_repository");
const UserRepository = require("./dao/user_repository");
const UserRolesRepository = require("./dao/user_roles_repository");
const ReservationRepository = require("./dao/reservation_repository");
const GuestRepository = require("./dao/guest_repository");

const GeneratePassword = require("./src/security/generatePassword");

const dao = new AppDAO("./database.sqlite3");
var password = "password123";
var passwordObj = GeneratePassword(password);

const superUser = {
  username: "superuser",
  full_name: "Super User",
  password_hash: passwordObj.hash_password,
  password_salt: passwordObj.salt,
};
const userRepository = new UserRepository(dao);
const rolesRepository = new RolesRepository(dao);
const userRolesRepository = new UserRolesRepository(dao);
const guestRepository = new GuestRepository(dao);
const reservation_repository = new ReservationRepository(dao);

userRepository.createTable();
guestRepository.createTable();
reservation_repository.createTable();
userRolesRepository
  .createTable()
  .then(() =>
    userRepository.create(
      superUser.username,
      superUser.full_name,
      superUser.password_hash,
      superUser.password_salt
    )
  )
  .then(() => rolesRepository.createTable())
  .then(() => userRolesRepository.create(1, 1))
  .then(() => {
    const roles = [
      {
        role_name: "System Administrator",
      },
      {
        role_name: "Administrator",
      },
      {
        role_name: "User",
      },
    ];

    return Promise.all(
      roles.map((role) => {
        return rolesRepository.create(role.role_name);
      })
    );
  })
  .catch((err) => {
    console.log("Error: ");
    console.log(JSON.stringify(err));
  });
