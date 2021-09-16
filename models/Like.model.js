const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
	{
		numberOfLike: {
			type: Number,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		post: {
			type: mongoose.Types.ObjectId,
			ref: "post",
		},
	},
	{ timestamps: true },
);

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
