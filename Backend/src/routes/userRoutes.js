const express = require("express");
const {
  getUserProfile,
  updateProfile,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// GET -> get user profile
router.get("/profile", protect, getUserProfile);

// PATCH -> update user profile
router.patch("/update-profile", protect, updateProfile);

module.exports = router;
