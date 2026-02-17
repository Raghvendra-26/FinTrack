const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// get user profile
async function getUserProfile(req, res) {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
}

// update user profile
async function updateProfile(req, res) {
  const { username, newPassword, oldPassword } = req.body;
  try {
    // Find user
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid token",
      });
    }

    // if user wants to change password
    if (oldPassword && newPassword) {
      // check old password
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect",
        });
      }

      // incrypt new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // set new password as password

      user.password = hashedPassword || user.password;
    }

    // update username if provided
    if (username) {
      user.username = username;
    }

    // save updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile update error", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating user profile",
    });
  }
}

module.exports = { getUserProfile, updateProfile };
