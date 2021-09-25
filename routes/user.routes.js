const express = require("express");
const router = express.Router();

const {
	userProfile,
	viewComment,
	postUserNameUpdate,
	postPost,
	postComment,
	postCommentLike,
	postCommentUnLike,
	postPostLike,
	postPostUnLike,
	deleteComment,
	deletePost,
	userHome,
} = require("../controllers/user.controller");

const authorized = require("../middlewares/authorization").isLoggedIn;

router.route("/post").post(authorized, postPost);

router.route("/").get(authorized, userHome);
router.route("/view-comment/:postId").get(viewComment);
router.route("/profile").get(authorized, userProfile);
router.route("/comment-post/:postId").post(authorized, postComment);
router.route("/like-post/:postId").post(authorized, postPostLike);

router.route("/like-post/:postId").post(authorized, postPostUnLike);
router.route("/like-comment/:commentId").post(authorized, postCommentLike);
router.route("/like-comment/:commentId").post(authorized, postCommentUnLike);
router.route("/delete-post/:postId").get(authorized, deletePost);
router.route("/delete-comment/:commentId").get(authorized, deleteComment);

module.exports = router;
