import express from "express";
import Order from "../models/Order.js";  // sadece import et, tekrar model tanımlama yok
import Cart from "../models/Cart.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// POST: Sipariş oluştur
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    // 🛒 Kullanıcının cart'ını al
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🧮 Toplam fiyat
    const total = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // 📝 Order oluştur
    const order = new Order({
      user: userId,
      products: cart.products.map((p) => ({
        product: p.product._id,
        quantity: p.quantity,
      })),
      address,
      total,
    });

    await order.save();

    // 🧹 Cart’ı temizle
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
});
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
  }
});

export default router;
