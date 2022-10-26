class RoomsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS Room (
            room_id INTEGER PRIMARY KEY AUTOINCREMENT,
             room_number INTEGER,
             beds_type_number INTEGER,
             current_price INTEGER,
            jacuzzi BOOLEAN
        )
        `;
    return await this.dao.run(sql);
  }

  async create(room_number, beds_type_number, current_price, jacuzzi) {
    return await this.dao.run(
      'INSERT INTO Room (room_number, beds_type_number, current_price, jacuzzi) VALUES (?, ?, ?, ?)',
      [room_number, beds_type_number, current_price, jacuzzi]
    );
  }

  async update(room_id, update_object) {
    let query = this.generate_column_update_query(update_object);
    return await this.dao.run(query, [room_id]);
  }

  generate_column_update_query(update_object) {
    let columns_values = '';
    for (let key in update_object) {
      if (key === 'room_id') continue;
      if (typeof update_object[key] === 'string') {
        columns_values.concat(`${key} = '${update_object[key]}',`);
      } else {
        columns_values.concat(`${key} = ${update_object[key]},`);
      }
    }
    return `UPDATE Room SET ${columns_values} ts_updated = ${this.generate_current_timestamp()} WHERE room_id = ?`;
  }

  generate_current_timestamp() {
    return Date.now();
  }

  async delete(room_id) {
    return this.dao.run(`DELETE FROM Room WHERE room_id = ?`, room_id);
  }

  async getById(room_id) {
    return this.dao.get('SELECT * FROM Room WHERE room_id = ?', [room_id]);
  }

  getAll() {
    return this.dao.get('SELECT * FROM Room');
  }
}

module.exports = RoomsRepository;
