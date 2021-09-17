const express = require("express");
const router = express.Router();
const {
	userHome,
	postPost,
	postComment,
	postLike,
} = require("../controllers/user.controller");

router.route("/post").get(userHome).post(postPost);
router.route("/comment").get(userHome).post(postComment);
router.route("/like").get(userHome).post(postLike);

module.exports = router;
