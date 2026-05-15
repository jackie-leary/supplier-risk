import { Router } from "express";
import { assessController } from "../controllers/assessController";

const router = Router();

router.post("/", assessController);

export default router;
