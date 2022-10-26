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

    create(guest_id, full_name, origin) {
        return this.dao.run(
            'INSERT INTO Guest (guest_id, full_name, origin) VALUES (?, ?, ?)',
            [guest_id, full_name, origin]
        )
    }

    // TODO UPDATE METHOD

    delete(guest_id) {
        return this.dao.run(
            `DELETE FROM Guest WHERE guest_id = ?`,
            [guest_id]
        )
    }

    getById(guest_id) {
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