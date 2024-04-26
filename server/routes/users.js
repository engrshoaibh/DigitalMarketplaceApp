const express = require('express')
const { registerUser, loginUser, getUsers, updateUserStatus} = require('../controllers/user')

const Router = express.Router

const router = Router()

router.get("/getUsers", getUsers)

router.post("/registerUser", registerUser)

router.post("/loginUser", loginUser)

router.patch("/updateUser", updateUserStatus)

module.exports = router