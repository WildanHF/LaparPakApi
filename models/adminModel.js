const db = require('../config/Database');

// CRUD operations for campaigns
const getAllCampaigns = async () => {
  const sql = 'SELECT * FROM campaigns';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

const createCampaign = async (data) => {
  const sql = 'INSERT INTO campaigns SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

const getCampaignById = async (id) => {
  const sql = 'SELECT * FROM campaigns WHERE id = ? ';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const updateCampaign = async (id, data) => {
    // Ambil semua kunci dari objek data
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`) // Format menjadi kolom = ?
      .join(', '); // Gabungkan dengan koma
  
    const values = Object.values(data); // Ambil semua nilai dari objek data
    values.push(id); // Tambahkan ID ke akhir nilai
  
    const sql = `UPDATE campaigns SET ${fields} WHERE id = ?`;
  
    try {
      const [result] = await db.query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  };
  

const deleteCampaign = async (id) => {
  const sql = 'DELETE FROM campaigns WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// CRUD operations for users
const getAllUsers = async () => {
  const sql = 'SELECT * FROM users';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

const createUser = async (data) => {
  const sql = 'INSERT INTO users SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, data) => {
  const sql = 'UPDATE users SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// CRUD operations for donations
// Mendapatkan semua donasi
const getAllDonations = async () => {
  const sql = 'SELECT * FROM donasi';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan donasi baru
const addDonation = async (data) => {
  const sql = 'INSERT INTO donasi SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan donasi berdasarkan ID
const getDonationsById = async (id) => {
  const sql = 'SELECT * FROM donasi WHERE id_donasi = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu donasi
  } catch (err) {
    throw err;
  }
};

// Mengupdate donasi
const updateDonation = async (id, data) => {
  const sql = 'UPDATE donasi SET ? WHERE id_donasi = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus donasi
const deleteDonation = async (id) => {
  const sql = 'DELETE FROM donasi WHERE id_donasi = ?';
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
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllDonations,
  addDonation,
  getDonationsById,
  updateDonation,
  deleteDonation
};