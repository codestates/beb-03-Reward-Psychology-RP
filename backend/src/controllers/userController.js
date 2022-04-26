import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.send("Join");
};

export const postJoin = async (req, res) => {
  const { email, userName, password, password2, profileImage } = req.body;
  const userNameOrEmailExists = await User.find({
    $or: [{ email }, { userName }],
  });

  if (password !== password2) {
    return res.status(400).send("Password Confirmation does not match");
  }

  if (!userNameOrEmailExists) {
    return res.status(400).send("Join Error: This user is already registered");
    // .render("Join", { errorMessage: "This user is already registered." });
  }

  try {
    await User.create({
      email,
      userName,
      password,
    });
    return res.send("to Login Page, Success Join");
    // .render("Login");
  } catch (error) {
    return res.status(400).send("Join Not Available");
    // .render("Join", { errorMessage: "Not Available" });
  }
};

export const getLogin = async (req, res) => {
  return res.send("Login Page");
  // .render("Login");
};

export const postLogin = async (req, res) => {
  const { userName, password, profileImage } = req.body;
  const user = await User.findOne({ userName });
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!user) {
    return res.status(404).send("Post Login Success");
    // .render("Login", {errorMessage: "An account with this username dose not exist.",});
  }
  if (!passwordCompare) {
    return res.status(404).send("Password Comparision does not match");
    // .render("Login", {errorMessage: "Wrong Password",});
  }
  console.log("🙆‍♂️ LOG USER IN!");
  return res.redirect("/");
};
