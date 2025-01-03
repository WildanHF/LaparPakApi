

const express = require('express');
const { addDonation, getAllDonations, updateDonation, deleteDonation } = require('../controllers/donationController');

const router = express.Router();

// Route untuk menambahkan donasi ke campaign tertentu
router.post('/donations', addDonation);

// Route untuk mendapatkan semua donasi
router.get('/donations', getAllDonations);

// Route untuk memperbarui donasi berdasarkan ID
router.put('/donations/:id', updateDonation);

// Route untuk menghapus donasi berdasarkan ID
router.delete('/donations/:id', deleteDonation);

module.exports = router;
