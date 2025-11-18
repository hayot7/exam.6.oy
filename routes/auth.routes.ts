import { Router } from "express";
import { register, login } from "../controller/auth.ctr";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;