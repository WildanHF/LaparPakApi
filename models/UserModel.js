const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");


const { DataTypes } = Sequelize;

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Tidak boleh null
        validate: {
            notEmpty: true // Tidak boleh kosong
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email harus unik
        validate: {
            isEmail: true // Memastikan format email valid
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true // Kolom ini bisa kosong, karena refresh token mungkin belum ada
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true, // Bisa kosong hingga ada permintaan reset password
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true, // Bisa kosong hingga ada permintaan reset password
    },
}, {
    freezeTableName: true
});


module.exports = Users;
