

const express = require('express');
const {
  fetchAllCampaigns,
  addCampaign,
  fetchCampaignById,
  updateCampaignById,
  removeCampaign,
} = require('../controllers/campaignController');

const router = express.Router();

router.get('/campaigns', fetchAllCampaigns);
router.post('/campaigns', addCampaign);
router.get('/campaigns/:id', fetchCampaignById);
router.put('/campaigns/:id', updateCampaignById);
router.delete('/campaigns/:id', removeCampaign);

module.exports = router;
