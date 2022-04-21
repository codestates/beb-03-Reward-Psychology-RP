import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/reward-psychology");

const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connecte to DB");
};

const handleError = (error) => {
  console.log("❌ DB Error", error);
};

db.on("error", handleError);
db.once("open", handleOpen);
