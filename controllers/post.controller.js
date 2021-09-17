const Post = require("../models/Post.model");

module.exports = {
	postPost: async (req, res) => {
		try {
			let { article } = req.body;

			// console.log(req.body);

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
};
