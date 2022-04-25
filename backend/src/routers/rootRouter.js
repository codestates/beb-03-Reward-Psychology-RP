import express from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/postingController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;
