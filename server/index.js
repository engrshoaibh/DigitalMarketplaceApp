/**
 * Initializing environment variables
 */
require("dotenv").config()

const express = require("express")
const {connectDB} = require("./store/connectDB")
const userRouter = require("./routes/users")
const prodRouter = require("./routes/product")
const server = express()

connectDB()
/** 
* Body parser
*/
server.use(express.urlencoded({ extended: true, limit: '25mb' }))
server.use(express.json({ limit: '25mb'}))

var cors = require('cors');
server.use(cors());

server.use("/users", userRouter)

server.use("/products", prodRouter)

server.listen(3001, () => {
  console.log("Server is started on Port 3001 ...")
})