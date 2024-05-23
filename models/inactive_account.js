const mongoose = require('mongoose');

const inactiveAccountSchema = new mongoose.Schema({
    accountActivationToken: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isActive: {
        type: Boolean
    }
},{
    timestamps: true
});

const InactiveAccount = mongoose.model('InactiveAccount', inactiveAccountSchema);

module.exports = InactiveAccount;

