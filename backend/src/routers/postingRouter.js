import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePosting,
<<<<<<< HEAD
} from "../controllers/postingController";
=======
} from "../controllers/postingController.js";
>>>>>>> jeong

const postingRouter = express.Router();

postingRouter.route("/upload").get(getUpload).post(postUpload);
<<<<<<< HEAD
postingRouter.get("/:id([0-9a-f]{24})/", watch);
postingRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
postingRouter.get("/:id([0-9a-f]{24})/delete", deletePosting);
=======
postingRouter.get("/:postingId([0-9a-f]{24})/", watch);
postingRouter
  .route("/:postingId([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(postEdit);
postingRouter.get("/:postingId([0-9a-f]{24})/delete", deletePosting);

>>>>>>> jeong
export default postingRouter;
