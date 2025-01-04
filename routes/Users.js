const express = require("express");
const { getUsers, Register, Login, requestResetPassword, resetPassword } = require("../controllers/Users.js");
const { verifyToken } = require("../middleware/VerifyToken.js");


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);


module.exports = router;