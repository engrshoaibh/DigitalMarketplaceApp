const mongoose = require('mongoose');

const Category = mongoose.Schema({
    "category" : "String"
}, {
    collection: "Categories",
    timestamps: true
})

module.exports = mongoose.model('Categories', Category)

