import express from "express";
import protect from "../middleware/auth.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  let totalPrice = 0;
  const normalizedItems = [];
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(400).json({ message: "Invalid product in order" });
    const price = product.discountPrice || product.price;
    totalPrice += price * item.quantity;
    normalizedItems.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price,
      quantity: item.quantity
    });
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems: normalizedItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  });

  res.status(201).json(order);
});

router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
