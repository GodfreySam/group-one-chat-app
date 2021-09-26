const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		statement: {
			type: String,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "like",
			},
		],
	},
	{ timestamps: true },
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
