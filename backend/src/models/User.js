import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  profileImage: String,
  walletAddress: String,
  balanceOfOwner: Number,
});

const User = mongoose.model("User", userSchema);

export default User;
