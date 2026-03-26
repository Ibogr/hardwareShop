import mongoose from "mongoose";

//to create a field for product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: String,

    description: String,

    image: String,
  },
  //timestamps: it create the field automatic about time
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
