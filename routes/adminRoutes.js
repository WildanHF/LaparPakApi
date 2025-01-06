const express = require('express');
const {
  getCampaigns,
  addCampaign,
  getCampaign,
  editCampaign,
  removeCampaign,
  getUsers,
  addUser,
  getUser,
  editUser,
  removeUser,
  getAllDonations,
  addDonation,
  getDonationsById,
  updateDonation,
  deleteDonation,
} = require('../controllers/adminController');

const router = express.Router();

// Campaign routes
router.get('/campaigns', getCampaigns);        // GET all campaigns
router.post('/campaigns', addCampaign);        // POST new campaign
router.get('/campaigns/:id', getCampaign);     // GET campaign by ID
router.put('/campaigns/:id', editCampaign);    // PUT update campaign
router.delete('/campaigns/:id', removeCampaign); // DELETE campaign

// User routes
router.get('/users', getUsers);                // GET all users
router.post('/users', addUser);                // POST new user
router.get('/users/:id', getUser);             // GET user by ID
router.put('/users/:id', editUser);            // PUT update user
router.delete('/users/:id', removeUser);       // DELETE user

// Donation routes
router.get('/donations', getAllDonations);        // GET semua donasi
router.post('/donations', addDonation);       // POST donasi baru
router.get('/donations/:id', getDonationsById);    // GET donasi berdasarkan ID
router.put('/donations/:id', updateDonation);   // PUT untuk update donasi
router.delete('/donations/:id', deleteDonation); // DELETE donasi

module.exports = router;