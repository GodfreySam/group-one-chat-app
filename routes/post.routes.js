const express = require("express");
const router = express.Router();
const { postPost } = require("../controllers/post.controller");

router.route("/post").post(postPost);

module.exports = router;
