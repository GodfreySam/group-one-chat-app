const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
	{
		like: {
			type: String,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true },
);

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
