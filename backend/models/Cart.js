import mongoose from "mongoose";

// this is the model. to create table like SQL in mongo atlas

const cartSchema = new mongoose.Schema({
  // in this user field, instead of creating a new one we get the user that already exist in the User model. for that referans for User, of course type for this field we need to tell that it's going to be the type that the data come from
  // so we can know that which order in the cart table belongs who
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
