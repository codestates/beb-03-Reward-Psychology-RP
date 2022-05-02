import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  title: { type: String, trim: true, maxlength: 50 },
  createdAt: { type: Date, default: Date.now },
  contents: { type: String, trim: true, minlength: 20 },
  hashtags: [{ type: String, trim: true }],
  meta: {
    voting: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  owner: { type: String, required: true, ref: "User" },
});

postingSchema.static("formatHashtags", function (hashtags) {
  return hashtags;
  // .split(",")
  // .map((hashtag) =>
  //   hashtag.startsWith("#") ? hashtag : `#${hashtag}`
  // );
});

const Posting = mongoose.model("Posting", postingSchema);

export default Posting;
