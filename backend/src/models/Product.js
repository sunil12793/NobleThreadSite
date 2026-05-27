import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "Noble Threads" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    countInStock: { type: Number, default: 0 },
    category: { type: String, required: true },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
