const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    specField: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    academicRank: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
