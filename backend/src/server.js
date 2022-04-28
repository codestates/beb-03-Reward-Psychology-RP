import "./db.js";
import "./models/Posting.js";
import "./models/User.js";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
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

//브라우저에게 cookie를 전송합니다.
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/posts", postingRouter);

app.listen(PORT, handleListening);

export default app;
