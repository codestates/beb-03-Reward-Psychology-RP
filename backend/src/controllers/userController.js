import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("Join");
};

export const postJoin = async (req, res) => {
  const { email, userName, password, password2, profileImage } = req.body;
  const userNameOrEmailExists = await User.find({
    $or: [{ email }, { userName }],
  });

  if (userNameOrEmailExists) {
    return res
      .status(400)
      .render("Join", { errorMessage: "This user is already registered." });
  }

  try {
    await User.create({
      email,
      userName,
      password,
    });
    return res.render("Login");
  } catch (error) {
    return res.status(400).render("Join", { errorMessage: "Not Available" });
  }
};

export const getLogin = async (req, res) => {
  return res.render("Login");
};

export const postLogin = async (req, res) => {
  const { userName, password, profileImage } = req.body;
  const user = await User.findOne({ userName });
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!user) {
    return res.status(404).render("Login", {
      errorMessage: "An account with this username dose not exist.",
    });
  }
  if (!passwordCompare) {
    return res.status(404).render("Login", {
      errorMessage: "Wrong Password",
    });
  }
  console.log("🙆‍♂️ LOG USER IN!");
  return res.redirect("/");
};
