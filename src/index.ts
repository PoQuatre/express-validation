import express from "express";
import morgan from "morgan";
import { config as dotenv } from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "models";

dotenv();

if (!process.env.MONGO_URL) {
  throw new Error("The environment variable `MONGO_URL` was not set!");
}

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URL);

app.use(morgan("common"));

app.get("/", async (req, res) => {
  res.json(await UserModel.find());
});

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
