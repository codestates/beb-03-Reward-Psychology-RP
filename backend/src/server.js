import "./db.js";
import "./models/Posting.js";
import "./models/User.js";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter.js";
import userRouter from "./routers/userRouter.js";
import postingRouter from "./routers/postingRouter.js";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
};

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/posts", postingRouter);

app.listen(PORT, handleListening);

export default app;
