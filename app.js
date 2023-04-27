import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";

import productsRoutes from "./routes/productsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";

import SwaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger.js";

import dotenv from "dotenv";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api-furniture", SwaggerUi.serve, SwaggerUi.setup(swaggerSpecs));

app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

export default app;
