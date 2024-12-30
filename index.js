import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js"
import cors from 'cors';
import router from "./routes/Users.js";
dotenv.config();
const app = express();

app.use(cors());

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}


app.use(express.json());
app.use(router);


app.listen(3000, ()=> console.log('Server running at port 3000'));