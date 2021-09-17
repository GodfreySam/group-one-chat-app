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
		secretToken:{
			type: String
		},

		verified:{
			type: Boolean,
			default: false
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
	},
	{ timestamps: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
