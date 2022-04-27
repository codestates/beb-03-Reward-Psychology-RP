import express from "express";
<<<<<<< HEAD
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/postingController";
=======
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController.js";
import { home, search } from "../controllers/postingController.js";
>>>>>>> jeong

const rootRouter = express.Router();

rootRouter.get("/", home);
<<<<<<< HEAD
rootRouter.get("/join", join);
rootRouter.get("/login", login);
=======
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
>>>>>>> jeong
rootRouter.get("/search", search);

export default rootRouter;
