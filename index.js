const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/Database.js");
const cors = require("cors");
const router = require("./routes/Users.js");

const bodyParser = require('body-parser');
const foodDonationRoutes = require('./routes/foodDonationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menambahkan async di sini untuk menangani db.authenticate


    app.use(express.json());
    app.use(router);

    // donation routes
    app.use('/api', foodDonationRoutes);
    app.use('/api', campaignRoutes);
    app.use('/api', donationRoutes);

    // admin routes
    app.use('/api/admin', adminRoutes);

    app.listen(3000, () => console.log('Server running at port 3000'));


