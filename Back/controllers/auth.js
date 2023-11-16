import { response } from "express";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

const createUser = async (req, res = response) => {
	if (!req.body.username || !req.body.password) {
		return res.status(400).send({ message: "Content can not be empty!" });
	}
	const { username, password } = req.body;

	const findUser = await User.findOne({ username: username });
	if (findUser) {
		return res.status(400).send({ message: "User already exists" });
	}

	const hash = await hashPassword(password);

	const user = await new User({ username: username, hash: hash });
	user.save();
	res.json({
		message: "User created",
	});
};

const login = async (req, res = response) => {
	if (!req.body.username || !req.body.password) {
		return res.status(400).send({ message: "Content can not be empty!" });
	}
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (!user) {
		return res.status(401).send({ message: "Unauthorized" });
	}

	const correct = await comparePassword(password, user.hash);
	if (!correct) {
		return res.status(401).send({ message: "Unauthorized" });
	}
	res.json({
		message: "Login correct",
	});
};

export { createUser, login };
