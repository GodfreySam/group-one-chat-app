const express = require("express");
const router = express.Router();

const {
	userProfile,
	viewComment,
	updateUser,
	postPost,
	postComment,
	postCommentLike,
	postPostLike,
	deleteComment,
	deletePost,
	userHome,
} = require("../controllers/user.controller");

const { ensureAuth } = require("../middlewares/authorization");

router.route("/post").post(ensureAuth, postPost);
router.route("/home").get(ensureAuth, userHome);
router.route("/home").post(ensureAuth, userHome);
router.route("/view-comment/:postId").get(viewComment);
router.route("/profile").get(ensureAuth, userProfile);
router.route("/profile").post(ensureAuth, updateUser);
router.route("/comment-post/:postId").post(ensureAuth, postComment);
router.route("/like-post/:postId").post(ensureAuth, postPostLike);
router.route("/like-comment/:commentId").post(ensureAuth, postCommentLike);
router.route("/delete-post/:postId").get(ensureAuth, deletePost);
router.route("/delete-comment/:commentId").get(ensureAuth, deleteComment);

module.exports = router;
