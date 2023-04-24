import { Router } from "express";
import {
  addProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controller/furnitureControler.js";
const router = Router();

router.route("/").get(getProducts).post(addProducts);
router
  .route("/:id")
  .patch(updateProducts)
  .get(getProductsById)
  .delete(deleteProducts);

export default router;
