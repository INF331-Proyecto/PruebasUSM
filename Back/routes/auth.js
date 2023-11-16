import { Router } from "express";
import { createUser, login } from "../controllers/auth.js";

const router = Router();

router.post("/create", createUser);

router.post("/", login);

export default router;
