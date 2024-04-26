const mongoose = require('mongoose');

const User = mongoose.Schema({
    "email": String,
    "password": String,
    "userType": String,
    "userStatus" : String
}, {
    collection: "Users",
    timestamps: true
})

module.exports = mongoose.model('Users', User)

