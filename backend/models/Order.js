import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  address: {
    fullName: { type: String, required: true },
    eircode: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  total: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// 🔹 Burası kritik:
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
