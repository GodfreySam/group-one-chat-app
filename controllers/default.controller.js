const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

module.exports = {
	home: async (req, res) => {
		try {
			let pageTitle = "Home page";
			let allPost = await Post.find({})
				.lean()
				.populate("user likes")
				.populate({ path: "comments", populate: { path: "user likes" } })
				.sort({ _id: -1 });
			
			res.render("default/index", {
				pageTitle,
				allPost
			});
		} catch (err) {
			console.log(err);
		}
	}
};
