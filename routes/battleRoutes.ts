import { Router } from "express";
import postBattle from "../controllers/battleController.js";
import schemaValidateMiddleware from "../middleware/schemaMiddleware.js";
import battleSchema from '../schemas/battleSchema'

const battleRouter = Router();

battleRouter.post('/battle',schemaValidateMiddleware(battleSchema),postBattle);

export default battleRouter