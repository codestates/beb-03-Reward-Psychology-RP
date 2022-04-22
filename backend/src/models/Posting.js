import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  userId: Number,
  title: String,
  createdAt: Date,
  contents: String,
  hashtags: [{ type: String }],
  meta: {
    voting: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
});

postingSchema.static("", function (hashtags) {
  // console.log(this.hashtags);
  return hashtags
    .split(",")
    .map((hashtag) => (hashtag.startsWith("#") ? hashtag : `#${hashtag}`));
});

const Posting = mongoose.model("Posting", postingSchema);

export default Posting;
