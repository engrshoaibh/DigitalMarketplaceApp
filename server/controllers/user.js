const express = require('express')
const User = require('../schemas/userSchema')
const mailVerifier = require('../config/mailVerifier');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose')
const generateVerificationToken = require('../config/tokenGenerator');
const registerUser = async (req, res) => {
    const { email, password, userType, userStatus } = req.body
    console.log(req.body);

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email,userType });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }
        const token = await generateVerificationToken()
        console.log(token);

        const verificationUrl = `http://localhost:3001/users/verify-email?token=${encodeURIComponent(token)}`;
        const text = `Here is your verification email link: ${verificationUrl}`
        console.log("Here is the Data", email, password, userType, userStatus, token)
        mailVerifier(email, "Verification Email", text);
        console.log("Here is the Data", email, password, userType, userStatus, token)
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        console.log("Hash Password",hashedPassword)
        
        const user = new User({
            email,
            password: hashedPassword,
            userType,
            userStatus,
            token
        });
        console.log("__________________________",user)
        // Save user to database
        await user.save();

        console.log('User registered successfully:', user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json("INTERNAL SERVER ERROR")
    }
}

const loginUser = async (req, res) => {
    console.log("Request ", req)
    const { email, password, userType } = req.body; 
    console.log("Login User Data", email, password, userType)

    try {
        // Find user by email and userType in the database
        const user = await User.findOne({ email,userType });

        if (!user) {
            return res.status(404).json({ message: 'User not found', ableToLogin : false });
          }
          console.log("User Password", user.password)
          if(!user.isVerified){
            return res.status(404).json({ message: 'Not Verified', ableToLogin : false })
          }
          // Check password
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({
              message: `Invalid credentials${password}`,
            });
          }
      
   
      
          res.status(200).json({ message: 'Signin successful', user: user });
      
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
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
        const user = await User.findOneAndUpdate({ email, userType, password }, { userStatus: status }, { new: true });

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

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    console.log("Token Extracted from Query : ", token)
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      // Find the user with the provided token
      const user = await User.findOne({ token: token });
  
      if (user) {
          // Update the user's isVerified status to true
          user.isVerified = true;
          await user.save();
          console.log("User Email is Verified Now!!!")
  
          // Set response headers
          res.set('Content-Type', 'text/html');
          // Send the verification page
          const filePath = path.join(__dirname, './Verification.html');
          console.log('Sending file from path:', filePath);
          return res.sendFile(filePath);
      } else {
          // No user found with the provided token
          return res.status(400).send('Invalid verification link');
      }
  
      return res.status(200).json({ message: 'Email verified successfully' });
  
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
const forgotPassword = async (req, res) => {
    const { email,userType } = req.body;
  
    try {
      const user = await User.findOne({ email,userType });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a random 8-character password
      const generatedPassword = generatePassword(8);
      console.log(generatedPassword)
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      mailVerifier(email, "Reset Password - Digital Products", `Your new password is ${generatedPassword}`)
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: 'Failed to send password reset email', error: error.message });
    }
  };
  

module.exports = { registerUser, loginUser, getUsers, updateUserStatus, verifyEmail ,forgotPassword};