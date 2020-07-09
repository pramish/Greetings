const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	// friends: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User",
	// 	},
	// ],
});

module.exports = User = mongoose.model("User", userSchema);