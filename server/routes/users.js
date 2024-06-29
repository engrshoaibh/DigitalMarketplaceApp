const express = require('express')
const { registerUser, loginUser, getUsers, updateUserStatus,forgotPassword, verifyEmail} = require('../controllers/user')

const Router = express.Router

const router = Router()

router.get("/getUsers", getUsers)

router.post("/registerUser", registerUser)

router.post("/loginUser", loginUser)

router.patch("/updateUser", updateUserStatus)

router.post("forgot-password", forgotPassword)

router.get('/verify-email', verifyEmail);
module.exports = router