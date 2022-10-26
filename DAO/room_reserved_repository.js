class RoomReservedRepository {
    constructor(dao) {
        this.dao = dao 
    }


    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS RoomReserved (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER,
            room_id INTEGER,
            price INTEGER,
            CONSTRAINT roomreserved_fk_reservation_id FOREIGN KEY (reservation_id) REFERENCES 
            Reservation(reservation_id) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT roomreserved_fk_room_id FOREIGN KEY (room_id) REFERENCES 
            Room(room_id) ON UPDATE CASCADE ON DELETE CASCADE
     		
        )
        `
        return this.dao.run(sql)
    }

    create(reservation_id, room_id, price) {
        return this.dao.run(
            'INSERT INTO RoomReserved (reservation_id, room_id, price) VALUES (?, ?, ?)',
            [reservation_id, room_id, price]
        )
    }

    // TODO UPDATE METHOD

    delete(id) {
        return this.dao.run(
            `DELETE FROM RoomReserved WHERE id = ?`,
            [id]
        )
    }

    getById(id) {
        return this.dao.get(
            `SELECT * FROM RoomReserved WHERE id = ?`,
            [id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM RoomReserved`)
    }

}

module.exports = RoomRepository;