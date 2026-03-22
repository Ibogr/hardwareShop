import Product from "../models/Product.js";

// 🔹 TÜM ÜRÜNLER
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// 🔹 TEK ÜRÜN (DETAIL PAGE İÇİN)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// 🔹 ÜRÜN EKLEME
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.file.path,
    });

    const savedProduct = await product.save();

    res.json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};
