class ReservationRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTable() {
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
        `;
    return await this.dao.run(sql);
  }

  async create(
    guest_id,
    user_id,
    start_date,
    end_date,
    ts_created,
    ts_updated,
    total_price,
    form_of_booking,
    company_name,
    number_of_adults,
    number_of_children,
    payment_date
  ) {
    return await this.dao.run(
      "INSERT INTO Reservation (guest_id, user_id, start_date, end_date, ts_created, ts_updated, total_price, form_of_booking, company_name, number_of_adults, number_of_children, payment_date) VALUES (?, ?, ? ,?, ?, ?, ?, ? ,?, ?, ?, ?)",
      [
        guest_id,
        user_id,
        start_date,
        end_date,
        ts_created,
        ts_updated,
        total_price,
        form_of_booking,
        company_name,
        number_of_adults,
        number_of_children,
        payment_date,
      ]
    );
  }

  /**
   * Method for updating a reservation, the update_object must have the
   * corresponding properties and correct values. This method updates only the properties
   * that are present in the update_object. If you include all properties, then the
   * entire reservation will be updated.
   *
   * For instance, if update_object is {start_date: Date.now()} then only the start_date
   * will be updated.
   * @param {Number} reservation_id
   * @param {Object} update_object the reservation object with the new info
   * @returns
   */
  async update(reservation_id, update_object) {
    let query = this.generate_column_update_query(update_object);
    return await this.dao.run(query, [reservation_id]);
  }

  /**
   * helper function for generating update query.
   * Generates a query with columns that correspond to the update_object's keys
   * and values.
   * @param {Object} update_object
   * @returns SQL update query for reservations
   */
  generate_column_update_query(update_object) {
    let columns_values = "";
    for (let key in update_object) {
      if (typeof update_object[key] === "string") {
        columns_values += key + " = " + "'" + update_object[key] + "'" + ",";
      } else {
        columns_values += key + " = " + update_object[key] + ",";
      }
    }
    return `UPDATE Reservation SET ${columns_values} ts_updated = ${this.generate_current_timestamp()} WHERE reservation_id = ?`;
  }

  /**
   * Helper for generating a current timestamp
   * @returns current timestamp
   */
  generate_current_timestamp() {
    return Date.now();
  }

  async delete(reservation_id) {
    return await this.dao.run(
      `DELETE FROM Reservation WHERE reservation_id = ?`,
      [reservation_id]
    );
  }

  async getById(reservation_id) {
    return await this.dao.get(
      `SELECT * FROM Reservation WHERE reservation_id = ?`,
      [reservation_id]
    );
  }

  getAll() {
    return this.dao.all(`SELECT * FROM Reservation`);
  }
}

module.exports = ReservationRepository;
