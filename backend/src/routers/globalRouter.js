import express from "express";

const globalRouter = express.Router();

const home = (req, res) => {
  return res.send("Home");
};

const join = (req, res) => {
  return res.send("Join");
};

const login = (req, res) => {
  return res.send("Login");
};

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
