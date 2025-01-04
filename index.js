const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/Database.js");
const cors = require("cors");
const router = require("./routes/Users.js");

const bodyParser = require('body-parser');
const foodDonationRoutes = require('./routes/foodDonationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menambahkan async di sini untuk menangani db.authenticate
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
    } catch (error) {
        console.error('Database connection error:', error);
    }

    app.use(express.json());
    app.use(router);

    app.use('/api', foodDonationRoutes);
    app.use('/api', campaignRoutes);
    app.use('/api', donationRoutes);

    app.listen(3000, () => console.log('Server running at port 3000'));
};

startServer();