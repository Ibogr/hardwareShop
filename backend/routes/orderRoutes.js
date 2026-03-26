import express from "express";
import Order from "../models/Order.js";
import verifyToken from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

// ✅ CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const { products, address, total, payment } = req.body;

    const order = new Order({
      user: req.user._id,
      products,
      address,
      total,
      payment: {
        isPaid: payment?.isPaid || false,
      },
    });

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

// ✅ USER ORDERS
router.get("/my", verifyToken, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("products.product", "name price")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// ✅ PAYMENT (FAKE)
router.put("/:id/pay", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    order.payment.isPaid = true;
    order.payment.paidAt = new Date();
    order.status = "Paid";

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
});

// ✅ ADMIN STATUS UPDATE
router.put("/:id/status", verifyAdmin, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  order.status = status;

  await order.save();

  res.json(order);
});

// ✅ ADMIN GET ALL ORDERS
router.get("/", verifyAdmin, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price");

  res.json(orders);
});

router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // euro → cent
      currency: "eur",
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
});

export default router;
