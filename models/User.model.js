const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		posts: [
			{
				type: mongoose.Types.ObjectId,
				ref: "post",
			},
		],
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "comment",
			},
		],
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "like",
			},
		],
	},
	{ timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
