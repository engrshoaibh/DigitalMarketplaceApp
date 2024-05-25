
const express = require('express')
const Product = require('../schemas/productSchema')
const { default: mongoose } = require('mongoose')
const Category = require('../schemas/categorySchema')

const addProduct = async (req, res) => {
    const productData = req.body
   
    try {
        const newPro = new Product({ ...productData })
        await newPro.save()
        return res.status(200).json({
            message: 'Product Successfully Added'
        })
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const deleteProduct = async (req, res) => {

    const { _id, proName, proDesc } = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({
                message: "No Product Exists!!!"
            })
        }

        await Product.deleteOne({ _id, proName, proDesc })

        res.status(200).json({
            message: "Product Deleted Successfully!!!"
        })
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }

}

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find()
        return res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const updateProdStatus = async (req, res) => {
    const { proName, proDesc, status } = req.body; // Get email, password, and userType from request body

    try {
        // Find user by email and userType in the database
        const product = await Product.findOneAndUpdate({ proName, proDesc }, { proStatus: status }, { new: true });

        // Check if user exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Save the updated user in the database
        await product.save();

        // Return a success response with the updated user object
        return res.status(200).json({ message: 'Product status updated successfully', product });
    } catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getApprovedProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({ proStatus: 'approved' });
        return res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const addCategory = async (req, res) => {
    const { category } = req.body
    try {
        const newCategory = new Category({ category })
        await newCategory.save()
        return res.status(200).json({
            message: 'Category Successfully Added'
        })
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const getCategory = async (req, res) => {
    try {
        const allCategories = await Category.find()
        return res.status(200).json(allCategories)
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}
const searchProducts = async (req, res) => {
    const keyword = req.query.proName;

    try {
        const result = await Product.aggregate(
            [
                {
                  $search: {
                    index: "SearchProduct",
                    text: {
                      query: keyword,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
            ]
        )
       
        res.status(200).send(result)
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addProduct, deleteProduct, getProducts, updateProdStatus, getApprovedProducts, addCategory, getCategory, searchProducts }