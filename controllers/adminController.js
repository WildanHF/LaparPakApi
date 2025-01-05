const { updateCampaign } = require('../models/adminModel');
const adminModel = require('../models/adminModel');

// Campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await adminModel.getAllCampaigns();
    res.json({
      success: true,
      message: 'Campaigns retrieved successfully',
      data: campaigns
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving campaigns',
      error: err.message
    });
  }
};

const addCampaign = async (req, res) => {
  try {
    const result = await adminModel.createCampaign(req.body);
    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating campaign',
      error: err.message
    });
  }
};

const getCampaign = async (req, res) => {
  try {
    const campaign = await adminModel.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    res.json({
      success: true,
      message: 'Campaign retrieved successfully',
      data: campaign
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving campaign',
      error: err.message
    });
  }
};

const editCampaign = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await updateCampaign(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    res.json({
      success: true,
      message: 'Campaign updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating campaign',
      error: err.message
    });
  }
};

const removeCampaign = async (req, res) => {
  try {
    const result = await adminModel.deleteCampaign(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        Data: false,
        message: 'Campaign not found'
      });
    }
    res.json({
      Data: true,
      message: 'Campaign deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      Data: false,
      message: 'Error deleting campaign',
      error: err.message
    });
  }
};

// Users
const getUsers = async (req, res) => {
  try {
    const users = await adminModel.getAllUsers();
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: err.message
    });
  }
};

const addUser = async (req, res) => {
  try {
    const result = await adminModel.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: err.message
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await adminModel.getUserById(req.params.id);
    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: err.message
    });
  }
};

const editUser = async (req, res) => {
  try {
    const result = await adminModel.updateUser(req.params.id, req.body);
    res.json({
      success: true,
      message: 'User updated successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const result = await adminModel.deleteUser(req.params.id);
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message
    });
  }
};

// Donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await adminModel.getAllDonations();
    res.json({
      success: true,
      message: 'Donations retrieved successfully',
      data: donations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving donations',
      error: err.message
    });
  }
};

const addDonation = async (req, res) => {
  try {
    const result = await adminModel.addDonation(req.body);
    res.status(201).json({
      success: true,
      message: 'Donation added successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error adding donation',
      error: err.message
    });
  }
};

const getDonationsById = async (req, res) => {
  try {
    const donation = await adminModel.getDonationsById(req.params.id);
    res.json({
      success: true,
      message: 'Donation retrieved successfully',
      data: donation
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving donation',
      error: err.message
    });
  }
};

const updateDonation = async (req, res) => {
  try {
    const result = await adminModel.updateDonation(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Donation updated successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating donation',
      error: err.message
    });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const result = await adminModel.deleteDonation(req.params.id);
    res.json({
      success: true,
      message: 'Donation deleted successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting donation',
      error: err.message
    });
  }
};

module.exports = {
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
  deleteDonation
};