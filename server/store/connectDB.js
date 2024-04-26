const mongoose = require("mongoose")

const connStr = `mongodb+srv://Talha:${process.env.DB_PASSWORD}@cluster0.uesbj32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDB = async () => {
    try {
        await mongoose.connect(connStr)
    } catch (error) {
        console.error(error)
    }
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected...")
})

module.exports = { connectDB }
