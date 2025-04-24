import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { updateAvatar } from '../controllers/userProfileController.js';
import upload from '../middleware/multer.js'
import { updateUserProfile, getUserProfile } from '../controllers/userProfileController.js';

const profileRouter = express.Router();

profileRouter.put('/avatar', upload.single('avatar'), userAuth, updateAvatar);
profileRouter.get('/user-profile', userAuth, getUserProfile);
profileRouter.put('/update-profile', userAuth, updateUserProfile);

export default profileRouter;