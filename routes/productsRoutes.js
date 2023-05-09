import { Router } from "express";
// import {

//   deleteProducts,
//   getProducts,
//   getProductsById,
//   updateProducts,
// } from "../controller/userController.js";
import {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductDetails,
  deleteProducts,
} from "../controller/productContoller.js";
const router = Router();
router.route("/").get(getAllProducts).post(addProducts);
router
  .route("/:id")
  .patch(updateProducts)
  .get(getProductDetails)
  .delete(deleteProducts);



export default router;
