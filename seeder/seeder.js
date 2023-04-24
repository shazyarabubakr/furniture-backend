import { connectDb } from "../config/db.js";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";

import Products from "../models/productsModels.js";

dotenv.config();

connectDb();

const __dirname = path.resolve();

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/seeder/data/products.json`))
);

const importData = async () => {
  try {
    await Products.create(data);
    console.log("import was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Products.deleteMany();
    console.log("delete was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") deleteData();
