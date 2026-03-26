import express from "express";
const router = express.Router();
import multer from "multer";
import { storage } from "../config/cloudinaryConnect.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const upload = multer({ storage });

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";
import verifyToken from "../middleware/authMiddleware.js";

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/add",
  verifyToken,
  adminMiddleware,
  upload.single("image"),
  createProduct
);

export default router;
