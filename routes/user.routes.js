const express = require("express");
const router = express.Router();
const {
	userHome,
	userProfile,
	postPost,
	postPostComment,
	postCommentLike,
	postCommentUnLike,
	postPostLike,
	postPostUnLike,
	deleteComment,
	deletePost,
} = require("../controllers/user.controller");

const authorized = require('../middlewares/authorization').isLoggedIn;

router.route("/")
	.get(userHome)
	.post(postPost);
router.route("/profile").get(userProfile);
// router.route("/comment").post(postComment);
router.route("/comment-post/:postId").post(postPostComment);
// router.route("/like").get(userHome);
// router.route("/like").post(postLike);
router.route("/like-post/:postId").post(postPostLike);
router.route("/like-post/:postId").post(postPostUnLike);
router.route("/like-comment/:commentId").post(postCommentLike);
router.route("/like-comment/:commentId").post(postCommentUnLike);
router.route("/delete-post/:postId").get(deletePost);
router.route("/delete-comment/:commentId").get(deleteComment);


module.exports = router;