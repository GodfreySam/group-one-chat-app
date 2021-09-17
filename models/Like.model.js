const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
	{
		numberOfLike: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "comment",
			},
		],
	},
	{ timestamps: true },
);

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
