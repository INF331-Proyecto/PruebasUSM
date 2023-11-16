import { Schema, model } from "mongoose";

const userSchema = Schema({
	username: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
});

export default model("User", userSchema);
