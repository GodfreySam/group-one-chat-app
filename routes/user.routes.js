const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/authorizations");

const {
	userHome,
	postPost,
	postComment,
	postLike,
	commentDelete,
	postDelete
} = require("../controllers/user.controller");

router.route("/post").get(userHome);
router.route("/post", isLoggedIn).post(postPost);
router.route("/comment").get(userHome);
router.route("/comment/:postId", isLoggedIn).post(postComment);
router.route("/like").get(userHome);
router.route("/like", isLoggedIn).post(postLike);
router.route("/like/:postId", isLoggedIn).post(postLike);
router.route("/like/:commentId", isLoggedIn).post(postLike);
router.route("/delete-post/:postId", isLoggedIn).get(postDelete);
router.route("/delete-comment/:commentId", isLoggedIn).get(commentDelete);


module.exports = router;
