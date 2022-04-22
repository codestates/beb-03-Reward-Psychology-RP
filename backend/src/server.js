import "./db";
import ".models/Posting";
import "./models/User";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import postingRouter from "./routers/postingRouter";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/posts", postingRouter);

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
