import express from "express";
import { join, login } from "../controllers/userController";
import { home, search, upload } from "../controllers/postingController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);
globalRouter.get("/upload", upload);
globalRouter.post("/upload", upload);

export default globalRouter;
