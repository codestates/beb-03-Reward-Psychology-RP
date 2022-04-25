import Posting from "../models/Posting.js";

export const home = async (req, res) => {
  try {
    const postings = await Posting.find({}).sort({ createdAt: "desc" });
    return res.send("home Page Success");
    // .render("Home", { postings });
  } catch (error) {
    return res.send("This is not the web page you are looking for!");
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let postings = [];
  if (keyword) {
    postings = await Posting.find({
      title: { $regex: new RegExp(keyword, i) },
    });
  }
  return res.send(postings);
  // .render("search", postings);
};

export const getUpload = (req, res) => {
  return res.send("Get Upload page Success");
  // .render("Upload");
};

export const postUpload = async (req, res) => {
  const { title, contents, hashtags } = req.body;
  try {
    await Posting.create({
      title,
      contents,
      hashtags: Posting.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log("❌ Post Upload Error:", error);
    return res.status(400).send("Fail Post Upload");
    // .render("Upload");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const posting = Posting.findById(id);

  if (!posting) {
    console.log("404 Not Found!");
    return res.status(404).send("404 Not Found!");
    // .render("404");
  }

  return res.send(posting);
  // .render("Watch", posting);
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.findById(id);
  if (!posting) {
    console.log("404 Not Found!");
    return res.status(404).send("404 Not Found!");
    // .render("404");
  }
  return res.send(posting);
  // .render("Edit", posting);
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const posting = await Posting.exists({ _id: id });
  const { title, contents, hashtags } = req.body;

  if (!posting) {
    console.log("404 Not Found!");
    return res.status(404).send("404 Not Found!");
    // .render("404");
  }

  await Posting.findByIdAndUpdate(id, {
    title,
    contents,
    hashtags: Posting.formatHashtags(hashtags),
  });
};

export const deletePosting = async (req, res) => {
  const { id } = req.body;

  await Posting.findByIdAndDelete(id);

  return res.redirect("/");
};
