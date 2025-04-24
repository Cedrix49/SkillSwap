import express from "express";
import { sendSkillSwapRequest, respondToSkillSwapRequest } from "../controllers/skillSwapController.js";
import userAuth from "../middleware/userAuth.js";

const skillRouter = express.Router();

skillRouter.post('/request', userAuth, sendSkillSwapRequest);
skillRouter.put('/request/:id/respond', userAuth, respondToSkillSwapRequest);

export default skillRouter;