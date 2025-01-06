const EditProfileModel = require('../models/EditProfileModel');

const EditProfileController = {
    getProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const profile = await EditProfileModel.getProfileById(userId);
            
            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: 'Profile not found'
                });
            }
            
            res.json({
                success: true,
                message: 'Profile retrieved successfully',
                data: profile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const result = await EditProfileModel.updateProfile(userId, req.body);
            
            res.json({
                success: true,
                message: 'Profile updated successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateProfilePicture: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file uploaded'
                });
            }

            const userId = req.params.id;
            const result = await EditProfileModel.updateProfile(userId, {
                profile_picture: req.file.filename
            });

            res.json({
                success: true,
                message: 'Profile picture updated successfully',
                data: {
                    profile_picture: req.file.filename
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = EditProfileController;