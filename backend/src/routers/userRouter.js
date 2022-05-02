import express from 'express';
import { getUserPostings } from '../controllers/postingController.js';
import { logout } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/myPosts', getUserPostings);
userRouter.get('/logout', logout);
// userRouter.get("/:userId/edit", edit);

export default userRouter;
