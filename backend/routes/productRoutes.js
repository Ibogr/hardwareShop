import express from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../config/cloudinaryConnect.js";

const upload = multer({ storage });

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/add", upload.single("image"), createProduct);

export default router;
