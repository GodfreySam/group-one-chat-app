const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

module.exports = {
	home: async (req, res) => {
		try {
			let pageTitle = "Home page";
			let user = await User.find({ user: req.user }).populate("comments posts likes");
			res.render("default/index", { pageTitle, user });
		} catch (err) {
			console.log(err);
		}
	},
};
