const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

const router = express.Router();

// POST -> register user
router.post("/register", registerUser);

// POST -> login user
router.post("/login", loginUser);

// POST -> logout user
router.post("/logout",logoutUser)

module.exports = router;
