const mongoose = require('mongoose');

const User = mongoose.Schema({
    "email": String,
    "password": String,
    "userType": String,
    "userStatus": String,
    isVerified: { type: Boolean, default: false }, //verify email
    token: String
}, {
    collection: "Users",
    timestamps: true
})

module.exports = mongoose.model('Users', User)

