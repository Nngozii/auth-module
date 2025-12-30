const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    resetToken: String,
    resetTokenExpiry: Date
});

module.exports = mongoose.model('User', userSchema);