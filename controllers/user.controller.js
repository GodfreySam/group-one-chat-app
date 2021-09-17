const Post = require("../models/Post.model");
const Like = require("../models/Like.model");
const Comment = require("../models/Comment.model");

module.exports = {
	userHome: async (req, res) => {
		try {
			let pageTitle = "Home page";
			let user = await User.find({ user: req.user }).populate(
				"comments posts likes",
			);
			res.render("default/index", { pageTitle });
		} catch (err) {
			console.log(err);
		}
	},

	postPost: async (req, res) => {
		try {
			let { article } = req.body;

			console.log(req.body);

			if (article === "") {
				req.flash("error-message", "Can not post empty field");
				return res.redirect("back");
			}

			let user = await User.findOne({ username });

			if (article.length > 300) {
				req.flash("error-message", "Post can not be more than 300 characters");
				return res.redirect("back");
			}

			const newPost = new Post({
				article,
			});

			await newPost.save();

			req.flash("success-message", "Your post was posted successfully");
			return res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},

	postComment: async (req, res) => {
		try {
			// let loggedInUser = req.user;

			let { comment } = req.body;

			console.log(req.body);

			if (comment === "") {
				req.flash("error-message", "Can not post empty comment");
				return res.redirect("back");
			}

			if (comment.length > 300) {
				req.flash("error-message", "Comment can not be more than 300 characters");
				return res.redirect("back");
			}

			const newComment = new Comment({
				comment,
				// user: loggedInUser._id,
			});

			await newComment.save();

			req.flash("success-message", "Your comment was posted successfully");
			return res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},

	postLike: async (req, res) => {
		try {
			let { like } = req.body;

			console.log(req.body);
			const newLike = new Like({ like });

			await newLike.save();

			req.flash("success-message", "You liked this post");
			return res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},
};
