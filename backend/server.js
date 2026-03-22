import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from"./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/cloudinaryConnect.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminOrdersRoutes from "./routes/adminOrdersRoutes.js";
import userRoutes from "./routes/users.js";


const PORT = process.env.PORT || 5000;


dotenv.config();



connectDB();


const app = express();


app.use(
  cors({
    origin: "https://harmonious-pony-54358b.netlify.app"
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server working");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
