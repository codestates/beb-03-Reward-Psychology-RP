import Posting from "../models/Posting.js";
import { mint } from "../../../daemon/mint.js";

export const home = async (req, res) => {
  try {
    const postings = await Posting.find({}).sort({ createdAt: "desc" });
    return res.send({ postings });
  } catch (error) {
    console.log("❌ Get Home Error:", error);
    return res.status(400).send({
      errorMessage: "This is not the web page you are looking for!",
    });
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let postings = [];
  if (keyword) {
    postings = await Posting.find({
      title: { $regex: new RegExp(keyword, "i") },
    }).sort({ createdAt: "desc" });
  }
  return res.send(postings);
};

export const postUpload = async (req, res) => {
  const { title, contents, hashtags, userName, address } = req.body;

  try {
    await Posting.create({
      title,
      contents,
      hashtags: Posting.formatHashtags(hashtags),
      owner: userName,
    });

    await mint(address, 1);

    return res.send("Upload Success, Go to Home Page");
  } catch (error) {
    console.log("❌ Post Upload Error:", error);

    return res.status(400).send({ errorMessage: "Fail Post Upload" });
  }
};

export const watch = async (req, res) => {
  const { postingId } = req.params;
  const posting = await Posting.findById(postingId);

  if (!posting) {
    return res.status(404).send({ errorMessage: "404 Not Found!" });
  }

  return res.send(posting);
};

export const getEdit = async (req, res) => {
  const { postingId } = req.params;
  const posting = await Posting.findById(postingId);
  if (!posting) {
    return res.status(404).send({ errorMessage: "404 Not Found!" });
  }
  return res.send({ posting });
};

export const postEdit = async (req, res) => {
  const { postingId } = req.params;
  const posting = await Posting.exists({ _id: postingId });
  const { title, contents, hashtags } = req.body;

  if (!posting) {
    return res.status(404).send({ errorMessage: "404 Not Found!" });
  }

  await Posting.findByIdAndUpdate(postingId, {
    title,
    contents,
    hashtags: Posting.formatHashtags(hashtags),
  });
  return res.send("Upload Success");
};

export const deletePosting = async (req, res) => {
  const { postingId } = req.params;

  await Posting.findByIdAndDelete(postingId);

  return res.send("Success Delete the Post");
};
