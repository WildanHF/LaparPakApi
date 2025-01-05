// const { Sequelize } = require("sequelize");
const mysql = require('mysql2/promise');
// const db = new Sequelize('laperpakk_db', 'root', '', {
//     host: "localhost",
//     dialect: "mysql"
// });
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laperpakk_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  (async () => {
    try {
      const connection = await pool.getConnection(); // Ambil koneksi dari pool
      console.log('Connected to the database.');
      connection.release(); // Kembalikan koneksi ke pool
    } catch (err) {
      console.error('Error connecting to database:', err.message);
    }
  })();
module.exports = pool;