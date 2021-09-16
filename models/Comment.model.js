const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		commentStatement: {
			type: String
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

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
