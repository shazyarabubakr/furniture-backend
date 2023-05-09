import Product from "../models/productsModels.js";
import path from "path";
import fs from "fs";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
import { tryCatch } from "../utils/tryCatch.js";

const directn = path.resolve();
const data = JSON.parse(fs.readFileSync(`${directn}/data/db.json`));
// console.log(data);

//get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: products });
};

export const getProductDetails = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError("product not found", 404);
    // res.status(404).json({ status: "ERROR", message: "product NOT found!" });
  }
  res.json({ status: "success", data: product });
});
// add products

export const addProducts = tryCatch(async (req, res) => {
  // try {
  const product = await Product.create(req.body);
  res.status(201).json({ status: "success", data: product });
  // } catch (err) {
  //   res.status(400).json({ status: "error ", data: err.message });
  // }
});
//update products

export const updateProducts = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json({ status: "success", data: product });
});

export const deleteProducts = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new CustomError("product not found", 404);
  }
  res.json({ status: "success", message: "product deleted successfully" });
};

// export const getProducts = async (req, res) => {
//   try {
//     // let query = JSON.stringify(req.query);
//     // query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
//     // let queryObj = JSON.parse(query);
//     // const excluteQuery = ["sort", "limit", "page", "fields", "search"];
//     // excluteQuery.forEach((key) => {
//     //   delete queryObj[key];
//     // });

//     // {
//     //   /**search */
//     // }
//     // if (req.query.search) {
//     //   queryObj.name = new RegExp(req.query.search, "i");
//     // }

//     // const getQuery = Product.find(queryObj);

//     // if (req.query.sort) {
//     //   getQuery.sort(req.query.sort);
//     // }
//     // if (req.query.fields) {
//     //   getQuery.select(req.query.fields);
//     // }

//     // const page = req.query.page || 1;
//     // const limit = req.query.limit || 20;
//     // const skip = limit * (page - 1);
//     // getQuery.skip(skip).limit(limit);

//     // const product = await getQuery;

//     // // const product = await Product.find(JSON.parse(query));

//     // const product = await Product.find();

//     res.json({ status: "success", results: product.length, data: product });
//   } catch (err) {
//     res.status(400).json({ status: "error", data: err });
//   }
// };
