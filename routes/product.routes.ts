import { Router } from "express";
import { getProducts, addProduct } from "../controller/product.ctr";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.get("/get_products", getProducts);
router.post("/add_product", auth, addProduct);

export default router;