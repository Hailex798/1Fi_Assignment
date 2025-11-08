import { Router } from "express";
import { listProducts, getProductBySlug } from "../controllers/productController";
const router = Router();
router.get("/", listProducts);
router.get("/:slug", getProductBySlug);
export default router;
