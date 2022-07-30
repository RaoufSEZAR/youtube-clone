import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError } from "./../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({ ...req.body, password: hash });
		await newUser.save();
		res.status(201).send(newUser);
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ name: req.body.name });

		if (!user) return next(createError(404, "User not found!"));

		const isCorrect = await bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT
		);
		const { password, ...other } = user._doc;
		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json(other);
	} catch (error) {
		next(error);
	}
};
