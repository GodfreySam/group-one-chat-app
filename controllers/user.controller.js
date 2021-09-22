const Post = require("../models/Post.model");
const Like = require("../models/Like.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

module.exports = {
	userHome: async (req, res) => {
		try {
			let pageTitle = "User Home";

			const userPost = await Post.find({ user: req.user })
				.populate("user comments likes")
				.sort({ _id: -1 });
			
			res.render("user/home", {
				pageTitle,
				userPost,
			});
		} catch (err) {
			console.log(err);
		}
	},
	userHome: async (req, res) => {
		try {
			let pageTitle = "Post page";
			res.render("default/post", { pageTitle });
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

			if (article.length > 250) {
				req.flash("error-message", "Post can not be more than 250 characters");
				return res.redirect("back");
			}

			const newPost = new Post({
				article
			});

			newPost.user = req.user.id
			await newPost.save();

			req.flash("success-message", "Your post was posted successfully");
			return res.redirect("/default/index");
		} catch (err) {
			console.log(err);
		}
	},

	postComment: async (req, res) => {
		try {
			let { comment } = req.body;

			console.log(req.body);

			if (!comment || comment === "") {
				req.flash("error-message", "Can not post empty comment");
				return res.redirect("back");
			}

			let postExist = await Post.findOne({ _id: req.params.postId });

			if (!postExist) {
				req.flash("error-message", "Post doesn't exist or has been deleted");
				return res.redirect("back");
			}

			if (comment.length > 300) {
				req.flash("error-message", "Comment can not be more than 300 characters");
				return res.redirect("back");
			}

			const newComment = new Comment({
				comment,
			});

			await newComment
				.save()
				.then((comment) => {
					postExist.comments.push(comment._id);
					postExist.save();
					req.flash("success-message", "Comment posted succesfully");
					return res.redirect("back");
				})
				.catch((error) => {
					if (error) {
						req.flash("error-message", error.message);
						res.redirect("back");
					}
				});

			req.flash("success-message", "Your comment was posted successfully");
			return res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},

	postPostLike: async (req, res) => {
		try {
			let { like } = req.body;

			console.log(req.body);

			let postExist = await Post.findOne({ _id: req.params.postId });

			const newLike = new Like({ like });

			if (postExist) {
				await newLike
					.save()
					.then((like) => {
						postExist.likes.push(like._id);
						postExist.save();
						req.flash("success-message", "You liked this post");
						return res.redirect("back");
					})
					.catch((error) => {
						if (error) {
							req.flash("error-message", error.message);
							res.redirect("back");
						}
					});
			}
		} catch (err) {
			console.log(err);
		}
	},

	postCommentLike: async (req, res) => {
		try {
			let { like } = req.body;

			console.log(req.body);

			let commentExist = await Comment.findOne({ _id: req.params.commentId });
		
			const newLike = new Like({ like });

			if (commentExist) {
				await newLike
					.save()
					.then((like) => {
						commentExist.likes.push(like._id);
						commentExist.save();
						req.flash("success-message", "You liked this comment");
						return res.redirect("back");
					})
					.catch((error) => {
						if (error) {
							req.flash("error-message", error.message);
							res.redirect("back");
						}
					});
			}
		} catch (err) {
			console.log(err);
		}
	},

	commentDelete: async (req, res) => {
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

	postDelete: async (req, res) => {
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
};
