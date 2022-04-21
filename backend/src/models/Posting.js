import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  userId: Number,
  title: String,
  createdAt: Date,
  contents: String,
  hashtags: [{ type: String }],
  meta: {
    voting: Number,
    views: Number,
    comments: Number,
  },
});

const Posting = mongoose.model("Posting", postingSchema);

export default Posting;
