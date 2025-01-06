const db = require('../config/Database.js');

const ContactUsModel = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM contact_us');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM contact_us WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const [result] = await db.execute(
            'INSERT INTO contact_us (first_name, last_name, email, phone_number, message) VALUES (?, ?, ?, ?, ?)',
            [data.first_name, data.last_name, data.email, data.phone_number, data.message]
        );
        return result;
    },

    update: async (id, data) => {
        const [result] = await db.execute(
            'UPDATE contact_us SET first_name=?, last_name=?, email=?, phone_number=?, message=? WHERE id=?',
            [data.first_name, data.last_name, data.email, data.phone_number, data.message, id]
        );
        return result;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM contact_us WHERE id = ?', [id]);
        return result;
    }
};

module.exports = ContactUsModel;