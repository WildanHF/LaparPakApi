const express = require('express');
const {
  getFoodDonations,
  getFoodDonation,
  addFoodDonation,
  updateFoodDonationById,
  deleteFoodDonationById,
} = require('../controllers/foodDonationController');

const router = express.Router();

// Ambil semua donasi makanan
router.get('/food-donations', getFoodDonations);

// Ambil donasi makanan berdasarkan ID
router.get('/food-donations/:id', getFoodDonation);

// Tambahkan donasi makanan baru
router.post('/food-donations', addFoodDonation);

// Update donasi makanan berdasarkan ID
router.put('/food-donations/:id', updateFoodDonationById);

// Hapus donasi makanan berdasarkan ID
router.delete('/food-donations/:id', deleteFoodDonationById);

module.exports = router;
