import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET SETTINGS
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      settings: user.settings || {
        darkMode: false,
        notifications: true,
        autoAssign: false,
        compactView: false,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE SETTINGS
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { settings: req.body },
      { new: true }
    );

    res.json(updatedUser.settings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
