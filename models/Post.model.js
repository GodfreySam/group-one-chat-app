const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		article: {
			type: String,
		},
		creator: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "comment",
			},
		],
	},
	{ timestamps: true },
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
