import Orders from "../models/orderModels.js";
import product from "../models/productsModels.js";

export const createOrders = async (req, res) => {
  try {
    const orders = await Orders.create(req.body);
    res.json({ status: "success", data: orders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const getOrder = async (req, res) => {
  try {
    const orders = await Orders.find().populate("order");
    res.json({ status: "success", results: orders.length, data: orders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const registerOrder = async (req, res) => {
  try {
    const orders = await Orders.findByIdAndUpdate(
      req.params.id,
      { $push: { orders: req.body.order } },
      {
        new: true,
      }
    );
    await product.findByIdAndUpdate(product, {
      $push: { orders: req.params.id },
    });
    res.json({ status: "success", data: orders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};
