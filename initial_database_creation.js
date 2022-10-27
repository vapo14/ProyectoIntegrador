const AppDAO = require("./DAO/dao");
const RolesRepository = require("./DAO/roles_repository");
const UserRepository = require("./DAO/user_repository");
const UserRolesRepository = require("./DAO/user_roles_repository");
const ReservationRepository = require("./DAO/reservation_repository");
const GuestRepository = require("./DAO/guest_repository");
const RoomRepository = require("./DAO/room_repository");
const RoomReservedRepository = require("./DAO/room_reserved_repository");
const bcrypt = require("bcryptjs");

const GetRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const dao = new AppDAO("./database.sqlite3");
var password = "password123";
var salt = GetRandomString(20);
var passwordObj = bcrypt.hashSync(password + salt);
const superUser = {
  username: "superuser",
  full_name: "Super User",
  password_hash: passwordObj,
  password_salt: salt,
};
const userRepository = new UserRepository(dao);
const rolesRepository = new RolesRepository(dao);
const userRolesRepository = new UserRolesRepository(dao);
const guestRepository = new GuestRepository(dao);
const reservation_repository = new ReservationRepository(dao);
const roomRepository = new RoomRepository(dao);
const room_reserved_repository = new RoomReservedRepository(dao);

room_reserved_repository.createTable();
userRepository.createTable();
guestRepository.createTable();
reservation_repository.createTable();
roomRepository.createTable();
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
