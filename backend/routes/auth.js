const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const router = express.Router();

//register..
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(409).json({ message: "user already exist..!" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      username,
      password: hashPass,
    });
    await user.save();

    res.status(201).json({ message: "user register successfully.." });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//login.....
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "user not found...",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "oops! wronge password ..." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.PRIVATE_KEY,
      { expiresIn: "1d" },
    );
    res.json({ token, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
