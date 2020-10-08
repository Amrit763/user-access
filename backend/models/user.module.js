const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        max: 100
    },
    password: {
        required: true,
        type: String
    },
    confirmPassword:{
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    dob: Date,
    updatedBy: String,
    role: {
        type: String,
        enum: ['admin', 'landlord', 'visitor']
    }
}, {
    timestamps: true
})

var userModel = mongoose.model('user', userSchema);
module.exports = userModel;

