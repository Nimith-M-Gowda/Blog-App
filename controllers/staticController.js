const Blog = require("../models/blog");

const renderHomePage = async function (req, res) {
  const allBlogs = await Blog.find({});
  return res.render("home", { user: req.user, allBlogs });
};

const renderLoginPage = function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }

  return res.render("login");
};

const renderSignupPage = function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }
  return res.render("signup");
};

module.exports = { renderHomePage, renderLoginPage, renderSignupPage };
