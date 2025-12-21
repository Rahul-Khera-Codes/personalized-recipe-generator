// server/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    dietaryPreferences: { type: String, required: true },
    dietaryRestrictions: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

// server/controllers/profileController.js
const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { dietaryPreferences, dietaryRestrictions } = req.body;
    try {
        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { dietaryPreferences, dietaryRestrictions },
            { new: true, runValidators: true }
        );
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// server/routes/profile.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);

module.exports = router;