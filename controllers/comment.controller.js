const Comment = require("../models/Comment.model");

module.exports = {
	postComment: async (req, res) => {
		try {
			let loggedInUser = req.user;

			let { statement } = req.body;

			if (statement === "") {
				req.flash("error-message", "Can not post empty comment");
				return res.redirect("back");
			}

			if (statement.length > 300) {
				req.flash("error-message", "Comment can not be more than 300 characters");
				return res.redirect("back");
			}

			const newComment = new Comment({
				statement,
				user: loggedInUser._id,
			});

			await newComment.save();

			req.flash("success-message", "Your comment was posted successfully");
			return res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},
};
