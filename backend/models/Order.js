import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  //this user field comes from User model so it can populate and we can get the data of relevant user
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  //this field create an array involve a couple of object.
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],

  address: {
    fullName: String,
    eircode: String,
    city: String,
    phone: String,
    address: String,
  },

  total: Number,

  payment: {
    method: { type: String, default: "card" },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
  },

  status: {
    type: String,
    default: "Pending", // Pending → Paid → Shipped → Delivered
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
