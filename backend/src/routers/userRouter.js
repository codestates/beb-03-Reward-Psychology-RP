import express from "express";

const userRouter = express.Router();

const logout = (req, res) => {
  return res.send("Logout");
};

const edit = (req, res) => {
  return res.send("Edit");
};

userRouter.get("/:userId/logout", logout);
userRouter.get("/:userId/edit", edit);

export default userRouter;
