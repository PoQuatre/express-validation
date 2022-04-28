import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("common"));

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
