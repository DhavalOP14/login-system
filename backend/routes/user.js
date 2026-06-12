const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");

router.get("/profile", authmiddleware, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

module.exports = router;
