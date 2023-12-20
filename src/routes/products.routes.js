import { Router } from "express";
const router = Router();

import * as productsController from "../controllers/products.controller.js";
import { verifyToken, isPremium, isAdmin } from "../middlewares/authJwt.js";

router.get("/getProducts", productsController.getProducts);
router.post(
  "/postProducts",
  [verifyToken, isPremium],
  productsController.createProduct
);
router.get("/:pid", productsController.getProductById);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

export default router;
