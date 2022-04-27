<<<<<<< HEAD
import Posting from "../models/Posting";
=======
import Posting from "../models/Posting.js";
>>>>>>> jeong

export const home = async (req, res) => {
  try {
    const postings = await Posting.find({}).sort({ createdAt: "desc" });
<<<<<<< HEAD
    return res.render("Home", { postings });
=======
    return res.send("home Page Success");
    // .render("Home", { postings });
>>>>>>> jeong
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
<<<<<<< HEAD
  return res.render("search", postings);
};

export const getUpload = (req, res) => {
  return res.render("Upload");
};

export const postUpload = async (req, res) => {
  // const postingSchema = new mongoose.Schema({
  //   userId: String,
  //   title: { type: String, trim: true, maxlength: 50 },
  //   createdAt: { type: Date, default: Date.now },
  //   contents: { type: String, trim: true, minlength: 20 },
  //   hashtags: [{ type: String, trim: true }],
  //   meta: {
  //     voting: { type: Number, default: 0 },
  //     views: { type: Number, default: 0 },
  //     comments: { type: Number, default: 0 },
  //   },
  // });
=======
  return res.send(postings);
  // .render("search", postings);
};

export const getUpload = (req, res) => {
  return res.send("Get Upload page Success");
  // .render("Upload");
};

export const postUpload = async (req, res) => {
>>>>>>> jeong
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
<<<<<<< HEAD
    return res.status(400).render("Upload");
=======
    return res.status(400).send("Fail Post Upload");
    // .render("Upload");
>>>>>>> jeong
  }
};

export const watch = async (req, res) => {
<<<<<<< HEAD
  const {id} =req.params;
  const posting = Posting.findById(id);

  if(!posting){
    console.log("404 Not Found!");
    return res.status(404).render("404");
  }

  return res.render("Watch", posting)
};

export const getEdit = (req, res) => {
  const {id} = req.params;
  const posting = await Posting.findById(id);
  if(!posting) {
    console.log("404 Not Found!");
    return res.status(404).render("404");
  }
  return res.render("Edit", posting);
};

export const postEdit = async (req, res) => {
  const {id} = req.params;
  const posting = await Posting.exists({_id:id});
  const {title, contents, hashtags} = req.body;

  if(!posting) {
    console.log("404 Not Found!");
    return res.status(404).render("404");
  }

  await Posting.findByIdAndUpdate(id,{
    title,
    contents,
    hashtags: Posting.formatHashtags(hashtags)
  })
=======
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
>>>>>>> jeong
};

export const deletePosting = async (req, res) => {
  const { id } = req.body;
<<<<<<< HEAD
  
=======

>>>>>>> jeong
  await Posting.findByIdAndDelete(id);

  return res.redirect("/");
};
