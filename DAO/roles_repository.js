class RolesRepository {
    constructor(dao) {
        this.dao = dao 
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Roles (
            role_id INTEGER PRIMARY KEY AUTOINCREMENT,
            role_name TEXT
        )
        `
        return this.dao.run(sql)
    }

    create(role_name) {
        return this.dao.run(
            'INSERT INTO Roles (role_name) VALUES (?)',
            [role_name]
        )
    }

    // TODO update method
    
    delete(role_id) {
        return this.dao.run(
            `DELETE FROM Roles WHERE role_id = ?`,
            [role_id]
        )
    }
}

module.exports = RolesRepository;