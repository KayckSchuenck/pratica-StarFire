import { Router } from "express";
import battleRouter from "./battleRoutes";

const router = Router();
router.use(battleRouter)

export default router;
