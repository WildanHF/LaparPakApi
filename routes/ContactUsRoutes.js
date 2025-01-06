const express = require('express');
const router = express.Router();
const {
    getContactUs,
    addContactUs,
    getContactUsByIdController,
    editContactUs,
    removeContactUs
} = require('../controllers/ContactUsController');

router.get('/contact_us', getContactUs);
router.post('/contact_us', addContactUs);
router.get('/contact_us/:id', getContactUsByIdController);
router.put('/contact_us/:id', editContactUs);
router.delete('/contact_us/:id', removeContactUs);

module.exports = router;