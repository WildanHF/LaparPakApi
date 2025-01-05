const express = require('express');
const {
    getAccounts, 
    addAccount, 
    getAccount, 
    editAccount,
    removeAccount,
    requestResetPassword,   
    resetPassword
} = require('../controllers/Users.js');

const router = express.Router();

router.get('/Account', getAccounts);
router.post('/Account/registrasi', addAccount);
router.post('/Account/login', getAccount);
router.put('/Account/:id', editAccount);
router.delete('/Account/:id', removeAccount);
router.post('/Account/request-reset', requestResetPassword);
router.post('/Account/reset-password/:token', resetPassword);

module.exports = router;