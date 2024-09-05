const { Router } = require("express");
const router = Router();
const { handleCommentPost } = require("../controllers/commentController");

router.post("/create", handleCommentPost);

module.exports = router;
