import Product from "../models/productsModels.js";

export const getProducts = async (req, res) => {
  try {
   

    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    let queryObj = JSON.parse(query);
    const excluteQuery = ["sort", "limit", "page", "fields", "search"];
    excluteQuery.forEach((key) => {
      delete queryObj[key];
    });

    {
      /**search */
    }
    if (req.query.search) {
      queryObj.name = new RegExp(req.query.search, "i");
    }

    const getQuery = Product.find(queryObj);

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }
    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = limit * (page - 1);
    getQuery.skip(skip).limit(limit);

    const product = await getQuery;

    // const product = await Product.find(JSON.parse(query));

    res.json({ status: "success", results: product.length, data: product });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const getProductsById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ status: "ERROR", message: "Todo NOT found!" });
  }
  res.json({ status: "success", data: product });
};

export const addProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ status: "success", data: product });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const updateProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ status: "success", data: product });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const deleteProducts = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404).json({ status: "ERROR", message: "Todo NOT found!" });
  }
  res.json({ status: "success", data: product });
};
