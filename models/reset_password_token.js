const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken', tokenSchema);

module.exports = ResetPasswordToken;

