import Posting from "../models/Posting";

export const home = async (req, res) => {
  await Posting.find();
};

export const search = (req, res) => {
  return res.send("Search");
};

export const upload = (req, res) => {
  return res.send("Upload");
};

export const watch = (req, res) => {
  return res.send("Watch");
};

export const edit = (req, res) => {
  return res.send("Edit");
};
