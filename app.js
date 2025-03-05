import express from "express";
import { config } from "dotenv";
import connectToDatabase from "./utils/databaseConnection.js";
import authRouter from "./routers/auth.js";
import postRouter from "./routers/post.js";
import tagRouter from "./routers/tag.js";

config(); // So we can access variables inside env file
connectToDatabase();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
