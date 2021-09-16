const Comment = require("../models/Comment.model");

module.exports = {
	comment: async (req, res) => {
		try {
			let { comment } = req.body;

			if (comment === "") {
				req.flash("error-message", "Can not post empty comment");
				return res.redirect("back");
			}

			if (comment.length > 300) {
				req.flash("error-message", "Comment can not be more 300 characters");
				return res.redirect("back");
			}

			const newComment = new Comment({
				comment,
			});

			let loggedInUser = req.user;

			let { title } = req.body;

			// Generate a unique link for each campaign using randomstring package;
			let campLink = `${
				req.headers.origin
			}/campaign/single-campaign/${randomstring.generate()}`;

			let newCampaign = new Campaign({
				title,
				user: loggedInUser._id,
				link: campLink,
			});

			await newComment.save();
		} catch (err) {
			console.log(err);
		}
	},
};
