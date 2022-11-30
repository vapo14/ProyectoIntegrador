class GuestRepository {
    constructor(dao) {
        this.dao = dao 
    }


    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Guest (
            guest_id INTEGER PRIMARY KEY AUTOINCREMENT,
     		full_name TEXT,
     		origin TEXT
        )
        `
        return this.dao.run(sql)
    }

    create(full_name, origin) {
        return this.dao.run(
            'INSERT INTO Guest (full_name, origin) VALUES (?, ?)',
            [full_name, origin]
        )
    }

    // TODO UPDATE METHOD

    delete(guest_id) {
        return this.dao.run(
            `DELETE FROM Guest WHERE guest_id = ?`,
            [guest_id]
        )
    }

    async getById(guest_id) {
        return this.dao.get(
            `SELECT * FROM Guest WHERE guest_id = ?`,
            [guest_id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM Guest`)
    }

}

module.exports = GuestRepository;