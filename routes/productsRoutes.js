import { Router } from "express";

import {
  getAllProducts,
  addProducts,
  updateProducts,
  getProductDetails,
  deleteProducts,
} from "../controller/productContoller.js";
import { isAuthenticatedUser } from "../middlewares/authent.middleware.js";

const router = Router();
router.route("/").get(isAuthenticatedUser, getAllProducts).post(addProducts);
router
  .route("/:id")
  .patch(updateProducts)
  .get(getProductDetails)
  .delete(deleteProducts);

export default router;
