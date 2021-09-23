const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

module.exports = {
	home: async (req, res) => {
		try {
			let pageTitle = "Home page";
			let allPost = await Post.find({}).populate(
				"user comments likes"
			).sort({ _id: -1 });
			let allComment = await Comment.find({})
				.populate("user comments likes")
				.sort({ _id: -1 });
			res.render("default/index", {
				pageTitle,
				allPost,
				allComment
			});
		} catch (err) {
			console.log(err);
		}
	},

	postHome: async (req, res) => {
		try {
			console.log(req.body);
			if (req.body) {
				req.flash("error-message", "Please Login or Sign up to continue");
				return res.redirect("/auth/login");
			}
		} catch (err) {
			console.log(err);
		}
	}
};
