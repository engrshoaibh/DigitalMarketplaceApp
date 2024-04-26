const express = require('express')
const { getProducts, addProduct, deleteProduct, updateProdStatus, getApprovedProducts, addCategory, getCategory } = require('../controllers/product')

const Router = express.Router

const router = Router()

router.get("/getProducts", getProducts)

router.post("/addProduct", addProduct)

router.delete("/deleteProduct", deleteProduct)

router.patch("/updateProduct", updateProdStatus)

router.get("/getApprovedProducts", getApprovedProducts)

router.post("/addCategory", addCategory)

router.get("/getCategory", getCategory)

module.exports = router