const db = require('../config/Database'); // Koneksi database menggunakan mysql2

const getAllAccounts = async () => {
    const sql = 'SELECT * FROM account';
    try {
      const [results] = await db.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  };
  
  const createAccount = async (data) => {
    const sql = 'INSERT INTO account SET ?';
    try {
      const [result] = await db.query(sql, data);
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  const getAccountByEmailorUsername = async (email, username) => {
    const sql = 'SELECT * FROM account WHERE email = ? OR username = ?';
    try {
      const [results] = await db.query(sql, [email, username]);
      return results[0] || null; // Pastikan hanya satu hasil dikembalikan
    } catch (err) {
      throw err;
    }
  };
  
  
  const updateAccount = async (id, data) => {
    const sql = 'UPDATE account SET ? WHERE id = ?';
    try {
      const [result] = await db.query(sql, [data, id]);
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  const deleteAccount = async (id) => {
    const sql = 'DELETE FROM account WHERE id = ?';
    try {
      const [result] = await db.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  const saveResetToken = async (email, token, expiry) => {
    const sql = 'UPDATE account SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    try {
      const [result] = await db.query(sql, [token, expiry, email]);
      return result;
    } catch (err) {
      throw err;
    }
  };
  
  const getAccountByResetToken = async (token) => {
    const sql = 'SELECT * FROM account WHERE reset_token = ? AND reset_token_expiry > NOW()';
    try {
      const [results] = await db.query(sql, [token]);
      return results[0] || null;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = {
    getAllAccounts, createAccount, getAccountByEmailorUsername, updateAccount, deleteAccount, saveResetToken, getAccountByResetToken
  }
