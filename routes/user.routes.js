const express = require("express");
const router = express.Router();


const {
	userHome,
	userProfile,
	postPost,
	postComment,
	postCommentLike,
	postPostLike,
	postPostUnLike,
	deleteComment,
	deletePost
} = require("../controllers/user.controller");

const authorized = require("../middlewares/authorizations").isLoggedIn;

router.route("/post").get(userHome).post(authorized, postPost);
router.route("/profile").get(userProfile);
router.route("/comment-post").get(userHome);
router.route("/comment", isLoggedIn).post(postComment);
router.route("/comment/:postId", isLoggedIn).post(postComment);
router.route("/like").get(userHome);
// router.route("/like", isLoggedIn).post(postLike);
router.route("/like-post/:postId", isLoggedIn).post(postPostLike);
router.route("/like-comment/:commentId", isLoggedIn).post(postCommentLike);
router.route("/delete-post/:postId", isLoggedIn).get(postDelete);
router.route("/delete-comment/:commentId", isLoggedIn).get(commentDelete);


module.exports = router;
