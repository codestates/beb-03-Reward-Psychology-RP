import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePosting,
} from "../controllers/postingController.js";

const postingRouter = express.Router();

postingRouter.route("/upload").get(getUpload).post(postUpload);
postingRouter.get("/:postingId([0-9a-f]{24})/", watch);
postingRouter
  .route("/:postingId([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(postEdit);
postingRouter.get("/:postingId([0-9a-f]{24})/delete", deletePosting);

export default postingRouter;
