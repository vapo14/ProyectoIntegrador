class UserRepository {
    constructor(dao) {
        this.dao = dao 
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS User (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            full_name TEXT,
            password_hash TEXT,
            password_salt TEXT
        )
        `
        return this.dao.run(sql)
    }

    create(username, full_name, password_hash, password_salt) {
        return this.dao.run(
            'INSERT INTO User (username, full_name, password_hash, password_salt) VALUES (?, ?, ?, ?)',
            [username, full_name, password_hash, password_salt]
        )
    }

    // TODO UPDATE METHOD

    delete(user_id) {
        return this.dao.run(
            `DELETE FROM User WHERE user_id = ?`,
            [user_id]
        )
    }

    getById(user_id) {
        return this.dao.get(
            `SELECT * FROM User WHERE user_id = ?`,
            [user_id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM User`)
    }
}

module.exports = UserRepository;