const { Router } = require("express");
const router = Router();
const {
  renderCreateBlog,
  handleCreateBlog,
  viewBlog,
} = require("../controllers/blogController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " - " + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/create", renderCreateBlog);
router.get("/view/:id", viewBlog);

router.post("/create", upload.single("coverImage"), handleCreateBlog);

module.exports = router;
