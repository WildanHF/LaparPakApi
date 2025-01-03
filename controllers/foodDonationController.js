const {
    getAllFoodDonations,
    getFoodDonationById,
    createFoodDonation,
    updateFoodDonation,
    deleteFoodDonation,
  } = require('../models/foodDonationModel');
  
  // Ambil semua donasi makanan
  const getFoodDonations = async (req, res) => {
    try {
      const donations = await getAllFoodDonations();
      res.status(200).json(donations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch food donations' });
    }
  };
  
  // Ambil donasi makanan berdasarkan ID
  const getFoodDonation = async (req, res) => {
    try {
      const { id } = req.params;
      const donation = await getFoodDonationById(id);
  
      if (!donation) {
        return res.status(404).json({ error: 'Donation not found' });
      }
  
      res.status(200).json(donation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch donation' });
    }
  };
  
  // Tambahkan donasi makanan baru
  const addFoodDonation = async (req, res) => {
    try {
      const data = req.body;
      const result = await createFoodDonation(data);
      res.status(201).json({ message: 'Donation created', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create donation' });
    }
  };
  
  // Update donasi makanan
  const updateFoodDonationById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await updateFoodDonation(id, data);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Donation not found' });
      }
  
      res.status(200).json({ message: 'Donation updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update donation' });
    }
  };
  
  // Hapus donasi makanan
  const deleteFoodDonationById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteFoodDonation(id);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Donation not found' });
      }
  
      res.status(200).json({ message: 'Donation deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete donation' });
    }
  };
  
  module.exports = {
    getFoodDonations,
    getFoodDonation,
    addFoodDonation,
    updateFoodDonationById,
    deleteFoodDonationById,
  };
  