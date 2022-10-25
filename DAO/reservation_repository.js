class ReservationRepository {
    constructor(dao) {
        this.dao = dao 
    }


    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Reservation (
            reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
     		guest_id INTEGER,
     		user_id INTEGER,
     		start_date DATE,
     		end_date DATE,
     		ts_created DATE,
     		ts_updated DATE,
     		total_price REAL,
     		form_of_booking TEXT,
     		company_name TEXT,
     		number_of_adults INTEGER,
     		number_of_children INTEGER,
            payment_date DATE,
            CONSTRAINT reservation_fk_user_id FOREIGN KEY (user_id) REFERENCES 
            User(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
            CONSTRAINT reservation_fk_guest_id FOREIGN KEY (guest_id) REFERENCES 
            Guest(guest_id) ON UPDATE CASCADE ON DELETE CASCADE
        )
        `
        return this.dao.run(sql)
    }

    create(reservation_id, guest_id, user_id, start_date, end_date, ts_created, ts_updated, total_price, form_of_booking, company_name, number_of_adults, number_of_children, payment_date) {
        return this.dao.run(
            'INSERT INTO Reservation (reservation_id, guest_id, user_id, start_date, end_date, ts_created, ts_updated, total_price, form_of_booking, company_name, number_of_adults, number_of_children, payment_date) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ? ,?, ?, ?, ?)',
            [reservation_id, guest_id, user_id, start_date, end_date, ts_created, ts_updated, total_price, form_of_booking, company_name, number_of_adults, number_of_children, payment_date]
        )
    }

    // TODO UPDATE METHOD

    delete(reservation_id) {
        return this.dao.run(
            `DELETE FROM Reservation WHERE reservation_id = ?`,
            [reservation_id]
        )
    }

    getById(reservation_id) {
        return this.dao.get(
            `SELECT * FROM Reservation WHERE reservation_id = ?`,
            [reservation_id]
        )
    }

    getAll() {
        return this.dao.all(`SELECT * FROM Reservation`)
    }

}

module.exports = ReservationRepository;