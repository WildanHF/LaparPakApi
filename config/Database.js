import { Sequelize } from "sequelize";

const db = new Sequelize('laperpakk_db','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;