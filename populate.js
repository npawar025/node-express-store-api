import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { Product } from "./models/product.js";
// import * as jsonProduct from "./products.json";
// const jsonProducts = import("./products.json", { type: "json" });
import jsonProducts from "./products.json" assert { type: "json" };
// import ('./products.json');


dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('SUCCESS');
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
start();
