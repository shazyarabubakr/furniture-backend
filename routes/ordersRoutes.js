import { Router } from "express";
import { createOrders } from "./usersRoutes.js";

const router = Router();

router.route("/").post(createOrders);

export default router;
