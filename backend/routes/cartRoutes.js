import express from "express";
import Cart from "../models/Cart.js";
import verifyToken from "../middleware/authMiddleware.js"; // token kontrolü

const router = express.Router();

// -------------------
// GET: Kullanıcının cart'ını getir
// -------------------
router.get("/", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    if (!cart) {
      // Eğer cart yoksa boş cart dön
      return res.json({ products: [] });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
});

// -------------------
// POST: Ürün ekle
// -------------------
router.post("/", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    await cart.populate("products.product"); // frontend için detaylı ürün bilgisi
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// -------------------
// DELETE: Ürünü cart'tan sil
// -------------------
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate("products.product"); // frontend için detaylı ürün bilgisi
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove product" });
  }
});

// -------------------
// PUT: Ürün miktarını güncelle
// -------------------
router.put("/:productId", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productToUpdate = cart.products.find(
      (p) => p.product.toString() === req.params.productId
    );

    if (!productToUpdate)
      return res.status(404).json({ message: "Product not in cart" });

    productToUpdate.quantity = quantity;
    await cart.save();
    await cart.populate("products.product");
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});

export default router;
