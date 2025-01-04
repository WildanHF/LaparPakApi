
const db = require("../config/Database.js");

// Tambahkan donasi baru ke campaign tertentu
const createDonation = async (campaignId, amount) => {
  const sql = 'INSERT INTO donations (campaign_id, amount) VALUES (?, ?)';
  try {
    const [result] = await db.query(sql, [campaignId, amount]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Dapatkan total donasi untuk campaign tertentu
const getTotalDonations = async (campaignId) => {
  const sql = 'SELECT SUM(amount) AS total FROM donations WHERE campaign_id = ?';
  try {
    const [results] = await db.query(sql, [campaignId]);
    return results[0].total || 0; // Jika tidak ada donasi, kembalikan 0
  } catch (err) {
    throw err;
  }
};

// Dapatkan semua donasi
const getAllDonations = async () => {
  const sql = 'SELECT * FROM donations';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Perbarui donasi berdasarkan ID
const updateDonation = async (id, amount) => {
  const sql = 'UPDATE donations SET amount = ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [amount, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus donasi berdasarkan ID
const deleteDonation = async (id) => {
  const sql = 'DELETE FROM donations WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createDonation, getTotalDonations, getAllDonations, updateDonation, deleteDonation };
