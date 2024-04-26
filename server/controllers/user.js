const express = require('express')
const User = require('../schemas/userSchema')
const { default: mongoose } = require('mongoose')

const registerUser = async (req, res) => {
    const userData = req.body
    //console.log(postData)
    try {
        const newUser = new User({...userData})
        await newUser.save()
        return res.status(200).json({
            message: 'User Successfully Registered'
        })
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const loginUser = async (req, res) => {
    console.log("Request ", req)
    const { email, password, userType } = req.body; // Get email, password, and userType from request body
      
    try {
        // Find user by email and userType in the database
        const user = await User.findOne({ email, userType, password });
    
        // Check if user exists and password matches
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const updateUserStatus = async (req, res) => {
    const { email, password, userType, status } = req.body; // Get email, password, and userType from request body
  
    try {
      // Find user by email and userType in the database
      const user = await User.findOneAndUpdate({ email, userType, password }, {userStatus : status}, {new : true});
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Save the updated user in the database
      await user.save();
  
      // Return a success response with the updated user object
      return res.status(200).json({ message: 'User status updated successfully', user });
    } catch (error) {
      console.error('Error updating user status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {registerUser, loginUser, getUsers, updateUserStatus};