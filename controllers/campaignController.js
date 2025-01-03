const {
    getAllCampaigns,
    createCampaign,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
  } = require('../models/campaignModel');
  
  const fetchAllCampaigns = async (req, res) => {
    try {
      const campaigns = await getAllCampaigns();
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  };
  
  const addCampaign = async (req, res) => {
    try {
      const { name, description, goal } = req.body;
  
      if (!name || !description || !goal) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const result = await createCampaign({ name, description, goal });
      res.status(201).json({ message: 'Campaign created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create campaign' });
    }
  };
  
  const fetchCampaignById = async (req, res) => {
    try {
      const campaign = await getCampaignById(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      res.status(200).json(campaign);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch campaign' });
    }
  };
  
  const updateCampaignById = async (req, res) => {
    try {
      const result = await updateCampaign(req.params.id, req.body);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      res.status(200).json({ message: 'Campaign updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update campaign' });
    }
  };
  
  const removeCampaign = async (req, res) => {
    try {
      const result = await deleteCampaign(req.params.id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Campaign not found' });
      }
      res.status(200).json({ message: 'Campaign deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete campaign' });
    }
  };
  
  module.exports = {
    fetchAllCampaigns,
    addCampaign,
    fetchCampaignById,
    updateCampaignById,
    removeCampaign,
  };
  