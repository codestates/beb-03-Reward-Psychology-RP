import express from "express";

const postingRouter = express.Router();

const watch = (req, res) => {
  return res.send("Watch");
};

const edit = (req, res) => {
  return res.send("Edit");
};

const upload = (req, res) => {
  return res.send("Upload");
};

postingRouter.get("/watch", watch);
postingRouter.get("/edit", edit);
postingRouter.post("/edit", edit);
postingRouter.get("/upload", upload);
postingRouter.post("/upload", upload);

export default postingRouter;
