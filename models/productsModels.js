import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  color: { type: String },
  rating: { type: Number },
  isActice: { type: Boolean },
  description:{type: String},
  image: [{ type: String }],
  quantity: { type: String },
});

const product = mongoose.model("product", productsSchema);
export default product;
