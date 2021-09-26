const Post = require("../models/Post.model");
const Like = require("../models/Like.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

module.exports = {
	userHome: async (req, res) => {
		try {
			let pageTitle = "Post page";
			const allPost = await Post.find({})
				.lean()
				.populate("user likes")
				.populate({ path: "comments", populate: { path: "user likes" } })
				.sort({ _id: -1 });
			res.render("default/index", {
				pageTitle,
				allPost,
			});
		} catch (err) {
			console.log(err);
		}
	},

	userProfile: async (req, res) => {
		try {
			let pageTitle = "User Profile";

			const userPosts = await Post.find({ user: req.user }).sort({ _id: -1 });
			const userComments = await Comment.find({ user: req.user }).sort({
				_id: -1,
			});
			const userLikes = await Like.find({ user: req.user }).sort({ _id: -1 });

			res.render("user/profile", {
				pageTitle,
				userPosts,
				userComments,
				userLikes,
				user: req.user,
			});
		} catch (err) {
			console.log(err);
		}
	},

	postUserNameUpdate: async (req, res) => {
		try {
			let { newusername } = req.body;

			// console.log(req.body);

			let username = await User.find({ user: req.user }).username;

			if (!newusername) {
				req.flash("error-message", "Please fill in a new user name");
				return res.redirect("back");
			}

			if (username === newusername) {
				req.flash(
					"error-message",
					"Username already exists, please use a different one",
				);
				return res.redirect("back");
			}

			let loggedInUser = await User.find({ user: req.user });

			loggedInUser.username = newusername;
			await loggedInUser.save();

			req.flash("success-message", "Your post was posted successfully");
			return res.redirect("/default/index");
		} catch (err) {
			console.log(err);
		}
	},

	postPost: async (req, res) => {
		try {
			let { article } = req.body;

			console.log(req.body);

			if (!article) {
				req.flash("error-message", "Field can not be empty");
				return res.redirect("back");
			}

			if (article.length > 300) {
				req.flash("error-message", "Post can not be more than 300 characters");
				return res.redirect("back");
			}

			const newPost = new Post({
				article,
			});

			newPost.user = req.user.id;
			await newPost.save();

			req.flash("success-message", "You created a new post");
			return res.redirect("/");
		} catch (err) {
			console.log(err);
		}
	},

	postComment: async (req, res) => {
		try {
			let { statement } = req.body;

			console.log(req.body);

			if (!statement || statement === "") {
				req.flash("error-message", "Can not post empty comment");
				return res.redirect("back");
			}

			let postExist = await Post.findOne({ _id: req.params.postId });

			if (!postExist) {
				req.flash("error-message", "Post doesn't exist or has been deleted");
				return res.redirect("back");
			}

			if (statement.length > 300) {
				req.flash("error-message", "Comment can not be more than 300 characters");
				return res.redirect("back");
			}

			const newComment = new Comment({
				statement,
			});

			newComment.user = req.user.id;

			await newComment
				.save()
				.then((comment) => {
					postExist.comments.push(comment._id);
					postExist.save();
					req.flash("success-message", "Comment posted successfully");
					return res.redirect("back");
				})
				.catch((error) => {
					if (error) {
						req.flash("error-message", error.message);
						return res.redirect("back");
					}
				});
		} catch (err) {
			console.log(err);
		}
	},

	postPostLike: async (req, res) => {
		try {
			let postExist = await Post.findOne({ _id: req.params.postId });
			let likeId = req.user.id;
			if (!postExist.likes.includes(likeId)) {
				await postExist.updateOne({ $push: { likes: likeId } });
				req.flash("success-message", "Post Liked!");
				return res.redirect("back");
			} else {
				await postExist.updateOne({ $pull: { likes: likeId } });
				req.flash("success-message", "Post Unliked!");
				return res.redirect("back");
			}
		} catch (err) {
			console.log(err);
		}
	},

	postCommentLike: async (req, res) => {
		try {
			let commentExist = await Comment.findOne({ _id: req.params.commentId });
			let likeId = req.user.id;
			if (!commentExist.likes.includes(likeId)) {
				await commentExist.updateOne({ $push: { likes: likeId } });
				req.flash("success-message", "Comment Liked!");
				return res.redirect("back");
			} else {
				await commentExist.updateOne({ $pull: { likes: likeId } });
				req.flash("success-message", "Comment Unliked!");
				return res.redirect("back");
			}
		} catch (err) {
			console.log(err);
		}
	},

	deleteComment: async (req, res) => {
		try {
			const { commentId } = req.params;
			let deletedComment = await Comment.findOneAndDelete({ commentId });

			if (!deletedComment) {
				req.flash(
					"error-message",
					"Comment could not be deleted now, please try again",
				);
				return res.redirect("back");
			}
			req.flash("success-message", "Comment deleted successfully");
			res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},

	deletePost: async (req, res) => {
		try {
			const { postId } = req.params;
			let deletedPost = await Post.findOneAndDelete({ postId });

			if (!deletedPost) {
				req.flash(
					"error-message",
					"Post could not be deleted now, please try again",
				);
				return res.redirect("back");
			}
			req.flash("success-message", "Post deleted successfully");
			res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},

	viewComment: async (req, res) => {
		try {
			let pageTitle = "View Comments";

			let post = await Post.findOne({ _id: req.params.postId });

			if (!post) {
				req.flash("error-message", "Post doesn't exist or has been deleted");
				return res.redirect("back");
			}

			res.render("user/view-comment", {
				pageTitle,
				post,
			});
		} catch (err) {
			console.log(err);
		}
	},
};
