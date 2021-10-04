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

const authorized = require("../middlewares/authorization").isLoggedIn;

router.route("/post").post(authorized, postPost);

router.route("/home").get(authorized, userHome);
router.route("/view-comment/:postId").get(viewComment);
router.route("/profile").get(authorized, userProfile);
router.route("/profile").post(authorized, updateUser);
router.route("/comment-post/:postId").post(authorized, postComment);
router.route("/like-post/:postId").post(authorized, postPostLike);
router.route("/like-comment/:commentId").post(authorized, postCommentLike);
router.route("/delete-post/:postId").get(authorized, deletePost);
router.route("/delete-comment/:commentId").get(authorized, deleteComment);

module.exports = router;
