const { Router } = require("express");
const router = Router();
const {
  handleLoginPage,
  handleSignupPage,
  handleLogout,
} = require("../controllers/userController");

router.get("/logout", handleLogout);
router.post("/signup", handleSignupPage);
router.post("/login", handleLoginPage);

module.exports = router;
