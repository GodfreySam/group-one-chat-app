const Like = require("../models/Like.model");

module.exports = {

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
