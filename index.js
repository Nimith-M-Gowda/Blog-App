const express = require("express");
const app = express();
const userRouter = require("./routers/userRoutes");
const blogRouter = require("./routers/blogRoutes");
const staticRouter = require("./routers/staticRouter");
const commentRouter = require("./routers/commentRouter");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForValidToken } = require("./middlewares/auth");

//config
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
mongoose
  .connect("mongodb://0.0.0.0:27017/GuviBlogs")
  .then(console.log("MongoDB Connected !"))
  .catch((err) => console.log("Connection Failed", err));

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkForValidToken);

//routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

//listener
app.listen(8000, () => console.log("Server started at port 8000"));
