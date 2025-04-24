import express from 'express';
import { getUserData, getPublicProfile, getSkillMatcher } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/public/:id', userAuth, getPublicProfile)
userRouter.get('/skill-matcher', userAuth, getSkillMatcher);

export default userRouter;