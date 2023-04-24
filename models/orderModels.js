import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },

  orders: [{ type: mongoose.Types.ObjectId, ref: "order", required: true }],
  products: [{ type: mongoose.Types.ObjectId, ref: "product", required: true }],
});

const order = mongoose.model("mark", ordersSchema);
export default order;
