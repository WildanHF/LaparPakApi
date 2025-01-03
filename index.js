import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js"
import cors from 'cors';
import router from "./routes/Users.js";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const foodDonationRoutes = require('./routes/foodDonationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}


app.use(express.json());
app.use(router);

app.use('/api', foodDonationRoutes);
app.use('/api', campaignRoutes);
app.use('/api', donationRoutes);



app.listen(3000, ()=> console.log('Server running at port 3000'));