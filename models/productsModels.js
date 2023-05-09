import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter Product Name"] },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxlength: [9, "Price cannot exceed 9 characters"],
  },
  color: { type: String },
  rating: { type: Number, default: 0 },
  isActive: { type: Boolean },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  stock: {
    type: String,
    required: [true, "Please Enter Product Stock"],
    maxlength: [4, "Store cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const product = mongoose.model("Product", productSchema);
export default product;
