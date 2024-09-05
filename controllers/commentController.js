const Comment = require("../models/comment");

async function handleCommentPost(req, res) {
  const { content, blogId } = req.body;
  if (!content) {
    throw new Error("content required");
  }
  try {
    const comment = await Comment.create({
      content,
      blogId,
      createdBy: req.user._id,
    });
    console.log("🚀 ~ handleCommentPost ~ comment:", comment);
    return res.json({ message: "success " });
  } catch (err) {
    return res.json({ err });
  }
}

module.exports = { handleCommentPost };
