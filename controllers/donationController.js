const donationModel = require('../models/donationModel');

// Tambahkan donasi baru ke campaign tertentu
const addDonation = async (req, res) => {
  const { campaignId, amount } = req.body;
  try {
    await donationModel.createDonation(campaignId, amount);
    const totalDonations = await donationModel.getTotalDonations(campaignId);
    res.status(201).json({
      message: 'Donation added successfully',
      campaign: {
        id: campaignId,
        totalDonations,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add donation' });
  }
};

// Dapatkan semua donasi
const getAllDonations = async (req, res) => {
  try {
    const donations = await donationModel.getAllDonations();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get donations' });
  }
};

// Perbarui donasi berdasarkan ID
const updateDonation = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    await donationModel.updateDonation(id, amount);
    res.status(200).json({ message: 'Donation updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update donation' });
  }
};

// Hapus donasi berdasarkan ID
const deleteDonation = async (req, res) => {
  const { id } = req.params;
  try {
    await donationModel.deleteDonation(id);
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete donation' });
  }
};

module.exports = { addDonation, getAllDonations, updateDonation, deleteDonation };
