class UserRolesRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS User_Roles (
            user_id INTEGER,
            role_id INTEGER,
            CONSTRAINT user_roles_fk_user_id FOREIGN KEY (user_id) REFERENCES 
            User(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT user_roles_fk_role_id FOREIGN KEY (role_id) REFERENCES 
            Roles(role_id) ON UPDATE CASCADE ON DELETE CASCADE
        )
        `
        return this.dao.run(sql)
    }

    create(user_id, role_id) {
        return this.dao.run(
            'INSERT INTO User_Roles (user_id, role_id) VALUES (?, ?)',
            [user_id, role_id]
        )
    }

    // TODO Update method

    delete(user_id) {
        return this.dao.run(
            `DELETE FROM User_Roles WHERE user_id = ?`,
            [user_id]
        )
    }

    getById(user_id) {
        return this.dao.get(
            `SELECT * FROM User_Roles WHERE user_id = ?`,
            [user_id]
        )
    }
}

module.exports = UserRolesRepository;