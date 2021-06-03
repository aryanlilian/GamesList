const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User model Schema
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
