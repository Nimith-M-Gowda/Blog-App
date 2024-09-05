const User = require("../models/user");
const { generateToken } = require("../utils/auth");

const handleSignupPage = async function (req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName) {
      throw new Error("Full Name required");
    }
    if (!email) {
      throw new Error("email required");
    }
    if (!password || password.length < 5) {
      throw new Error("password required & min length is 5");
    }

    //write into Database
    const user = await User.create({ email, password, fullName });
    const token = await generateToken(user._id);

    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signup", { error });
  }
};

const handleLoginPage = async function (req, res) {
  const { email, password } = req.body;

  try {
    if (!email) {
      throw new Error("email required");
    }
    if (!password || password.length < 5) {
      throw new Error("password required & min length is 5");
    }
    //while logging in
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not existed");
    }
    if (user.password != password) {
      throw new Error("Passwords not matching");
    }

    const token = await generateToken(user._id);

    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("login", { error });
  }
};

function handleLogout(req, res) {
  return res.clearCookie("token").redirect("/");
}

module.exports = { handleSignupPage, handleLoginPage, handleLogout };
