import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    if (process.argv.includes("--clear")) {
      await Product.deleteMany({});
      console.log("Products cleared");
      process.exit(0);
    }

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Sample products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

run();
