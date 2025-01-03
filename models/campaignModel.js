
const db = require('../config/db');

// Mendapatkan semua campaign
const getAllCampaigns = async () => {
  const sql = 'SELECT * FROM campaigns';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan campaign baru
const createCampaign = async (data) => {
  const sql = 'INSERT INTO campaigns SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan campaign berdasarkan ID
const getCampaignById = async (id) => {
  const sql = 'SELECT * FROM campaigns WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

// Mengupdate campaign
const updateCampaign = async (id, data) => {
  const sql = 'UPDATE campaigns SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus campaign
const deleteCampaign = async (id) => {
  const sql = 'DELETE FROM campaigns WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllCampaigns,
  createCampaign,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
