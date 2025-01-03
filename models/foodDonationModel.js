const db = require('../config/db');

// Ambil semua donasi makanan
const getAllFoodDonations = async () => {
  const sql = `SELECT * FROM food_donations`;
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Ambil donasi makanan berdasarkan ID
const getFoodDonationById = async (id) => {
  const sql = `SELECT * FROM food_donations WHERE id = ?`;
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

// Tambahkan donasi makanan baru
const createFoodDonation = async (data) => {
  const sql = `INSERT INTO food_donations SET ?`;
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Update donasi makanan
const updateFoodDonation = async (id, data) => {
  const sql = `UPDATE food_donations SET ? WHERE id = ?`;
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Hapus donasi makanan
const deleteFoodDonation = async (id) => {
  const sql = `DELETE FROM food_donations WHERE id = ?`;
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllFoodDonations,
  getFoodDonationById,
  createFoodDonation,
  updateFoodDonation,
  deleteFoodDonation,
};
