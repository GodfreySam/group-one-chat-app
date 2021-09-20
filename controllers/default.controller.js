const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

module.exports = {
	home: async (req, res) => {
		try {
			let pageTitle = "Home page";
			let allPost = await Post.find({}).populate(
				"user comments likes",
			);
			res.render("default/index", {
				pageTitle,
				allPost
			});
		} catch (err) {
			console.log(err);
		}
	},
};
