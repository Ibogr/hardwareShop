import express from "express";
import Order from "../models/Order.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 ADMIN kontrol middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

// 🔹 TÜM ORDERLAR
router.get("/", verifyToken, isAdmin, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price");

  res.json(orders);
});

// 🔥 STATUS UPDATE
router.put("/:orderId", verifyToken, isAdmin, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;
