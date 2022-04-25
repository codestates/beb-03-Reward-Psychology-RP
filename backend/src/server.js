import "./db.js";
import "./models/Posting.js";
import "./models/User.js";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import postingRouter from "./routers/postingRouter";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(logger);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/posts", postingRouter);

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
