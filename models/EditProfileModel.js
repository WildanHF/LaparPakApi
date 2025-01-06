const db = require('../config/Database');

const EditProfileModel = {
    getProfileById: async (userId) => {
        const [rows] = await db.execute(`
            SELECT a.username, a.email, 
                   ep.phone_number, ep.profile_picture, 
                   ep.gender, DATE_FORMAT(ep.birth_date, '%Y-%m-%d') as birth_date 
            FROM account a 
            LEFT JOIN edit_profile ep ON a.id = ep.user_id 
            WHERE a.id = ?`, 
            [userId]
        );
        return rows[0];
    },

    updateProfile: async (userId, data) => {
        try {
            // Convert undefined values to null
            const phone_number = data.phone_number || null;
            const profile_picture = data.profile_picture || null;
            const gender = data.gender || null;
            const birth_date = data.birth_date || null;

            // Check if profile exists
            const [existing] = await db.execute(
                'SELECT * FROM edit_profile WHERE user_id = ?',
                [userId]
            );

            if (existing.length === 0) {
                // Insert new profile
                const [result] = await db.execute(
                    'INSERT INTO edit_profile (user_id, phone_number, profile_picture, gender, birth_date) VALUES (?, ?, ?, ?, ?)',
                    [userId, phone_number, profile_picture, gender, birth_date]
                );
                return result;
            } else {
                // Update existing profile
                const [result] = await db.execute(
                    'UPDATE edit_profile SET phone_number=?, profile_picture=?, gender=?, birth_date=? WHERE user_id=?',
                    [phone_number, profile_picture, gender, birth_date, userId]
                );
                return result;
            }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = EditProfileModel;