const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {
  getAllAccounts, createAccount, getAccountByEmailorUsername, updateAccount, deleteAccount, saveResetToken, getAccountByResetToken
} = require('../models/UserModel');

const getAccounts = async (req, res) => {
  try {
    const items = await getAllAccounts(); // Menggunakan async/await
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Accounts', details: err.message });
  }
};

const addAccount = async (req, res) => {
  const data = req.body;
  try {
    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(data.password, 10);  // 10 adalah salt rounds
    data.password = hashedPassword;


    const result = await createAccount(data);
    res.json({ message: 'Account Created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating Account', details: err.message });
  }
};

const getAccount = async (req, res) => {
  const { email, username, password } = req.body; // Ambil dari query params untuk fleksibilitas
  if (!email && !username) {
    return res.status(400).json({ error: 'Email or username must be provided' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password must be provided' });
  }

  try {
    const account = await getAccountByEmailorUsername(email, username);
    console.log('Account fetched',account);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email/username or password' });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Account', details: err.message });
  }
};


const editAccount = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateAccount(id, data);
    res.json({ message: 'Account updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating Account', details: err.message });
  }
};

const removeAccount = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteAccount(id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting Account', details: err.message });
  }
};

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'whadi611@gmail.com',
    pass: 'pego obpn folj qynn',
  },
});

// Request Reset Token
const requestResetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email must be provided' });
    }
  
    try {
      const account = await getAccountByEmailorUsername(email, null);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 jam
  
      await saveResetToken(email, resetToken, tokenExpiry);
  
      const resetLink = `http://127.0.0.1:8000/api/reset-password?token=${resetToken}`;
  
      await transporter.sendMail({
        from: 'whadi611@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      });
  
      console.log({ msg: 'Reset email sent successfully', resetLink }); // Logging tambahan
      res.json({ msg: 'Reset email sent successfully' }); // Pastikan format respons ini konsisten
    } catch (err) {
      console.error("Error in requestResetPassword:", err);
      res.status(500).json({ error: 'Error requesting password reset', details: err.message });
    }
  };
  


// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password must be provided' });
  }

  try {
    const account = await getAccountByResetToken(token);
    if (!account) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateAccount(account.id, { password: hashedPassword, reset_token: null, reset_token_expiry: null });

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error resetting password', details: err.message });
  }
};

module.exports = {
  getAccounts, addAccount, getAccount, editAccount, removeAccount, requestResetPassword, resetPassword
}