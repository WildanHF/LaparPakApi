const ContactUsModel = require('../models/ContactUsModel');

const ContactUsController = {
    getContactUs: async (req, res) => {
        try {
            const contacts = await ContactUsModel.getAll();
            res.json({ success: true, data: contacts });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getContactUsByIdController: async (req, res) => {
        try {
            const contact = await ContactUsModel.getById(req.params.id);
            if (!contact) {
                return res.status(404).json({ success: false, message: 'Contact not found' });
            }
            res.json({ success: true, data: contact });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    addContactUs: async (req, res) => {
        try {
            const { first_name, last_name, email, phone_number, message } = req.body;
            const result = await ContactUsModel.create({ first_name, last_name, email, phone_number, message });
            res.status(201).json({ success: true, message: 'Contact created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    editContactUs: async (req, res) => {
        try {
            const result = await ContactUsModel.update(req.params.id, req.body);
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Contact not found' });
            }
            res.json({ success: true, message: 'Contact updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    removeContactUs: async (req, res) => {
        try {
            const result = await ContactUsModel.delete(req.params.id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Contact not found' });
            }
            res.json({ success: true, message: 'Contact deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = ContactUsController;