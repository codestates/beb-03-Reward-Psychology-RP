import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(logger);

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
