require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 5000;
const connectDB = require("./config/db");
const videoRoutes = require("./routes/videos.routes");

connectDB();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", videoRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
