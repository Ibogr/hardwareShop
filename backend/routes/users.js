import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 GET CURRENT USER
router.get("/me", verifyToken, async (req, res) => {
  try {
    res.json(req.user); // middleware zaten user'ı ekliyor
    console.log(req.user, "user req");
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
});

export default router;
