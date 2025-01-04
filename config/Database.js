const { Sequelize } = require("sequelize");

const db = new Sequelize('laperpakk_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;
