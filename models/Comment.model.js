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
		likes: {
			type: Array,
			default: [],
		},
		posts: [
			{
				type: mongoose.Types.ObjectId,
				ref: "post",
			},
		],
	},
	{ timestamps: true },
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
