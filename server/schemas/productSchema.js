const mongoose = require('mongoose');

const Product = mongoose.Schema({
    "proName" : "String",
    "proDesc" : "String",
    "proPrice" : "String",
    "proStatus" : "String",
    "imageFile" : "String",
    "productCategory" : "String"
}, {
    collection: "Products",
    timestamps: true
})


module.exports = mongoose.model('Products', Product)

