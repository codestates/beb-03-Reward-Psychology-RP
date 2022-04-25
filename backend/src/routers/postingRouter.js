import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePosting,
} from "../controllers/postingController";

const postingRouter = express.Router();

postingRouter.route("/upload").get(getUpload).post(postUpload);
postingRouter.get("/:id([0-9a-f]{24})/", watch);
postingRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postingRouter.get("/:id([0-9a-f]{24})/delete", deletePosting);
export default postingRouter;
