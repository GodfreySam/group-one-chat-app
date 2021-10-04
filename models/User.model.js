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
		username: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		secretToken: {
			type: String,
		},
		verified: {
			type: Boolean,
			default: false,
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
		avatar: {
			type: String,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;