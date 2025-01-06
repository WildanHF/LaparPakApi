const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/Database.js");
const cors = require("cors");
const userRouter = require("./routes/Users.js");
const bodyParser = require('body-parser');
const foodDonationRoutes = require('./routes/foodDonationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const contactUsRoutes = require('./routes/ContactUsRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', userRouter);
app.use('/api', foodDonationRoutes);
app.use('/api', campaignRoutes); 
app.use('/api', donationRoutes);
app.use('/api', contactUsRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));