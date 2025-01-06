const express = require('express');
const { getPayments, addPayment, updatePayment, deletePayment } = require('../controllers/paymentController');

const router = express.Router();

router.get('/payments', getPayments);
router.post('/payments', addPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

module.exports = router;