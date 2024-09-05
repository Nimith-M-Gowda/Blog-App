const Blog = require("../models/blog");
const Comment = require("../models/comment");

function renderCreateBlog(req, res) {
  if (req.user) {
    return res.render("createBlog", { user: req.user });
  } else return res.redirect("/");
}

async function handleCreateBlog(req, res) {
  const { title, content } = req.body;
  try {
    await Blog.create({
      title,
      content,
      coverImage: req.file.filename,
      createdBy: req.user._id,
    });
    return res.render("createBlog", { message: "Blog created Successfully" });
  } catch (err) {
    return res.render("createBlog", { user: req.user, error: err });
  }
}

async function viewBlog(req, res) {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({ blogId: id }).populate("createdBy");
    res.render("blog", { user: req.user, blog, comments });
  } catch (error) {
    res.render("home", { user: req.user, error });
  }
}

module.exports = { handleCreateBlog, renderCreateBlog, viewBlog };
