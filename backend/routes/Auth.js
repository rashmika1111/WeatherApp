
const express = require('express');
const router = express.Router();
const User=require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const extistUser=await User.findOne({email});
   if (extistUser) return res.status(400).json({ message: "User already exists" });

   const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ 
      message: "User registered successfully",
      token 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/login",async(req,res)=>{
   try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
      message: "Login successful",
      token 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;