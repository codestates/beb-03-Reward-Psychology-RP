import express from "express";
import { watch, edit } from "../controllers/postingController";

const postingRouter = express.Router();

postingRouter.get("/:id([0-9a-f]{24})", watch);
postingRouter.get("/:id([0-9a-f]{24})/edit", edit);
postingRouter.post("/:id([0-9a-f]{24})/edit", edit);

export default postingRouter;
