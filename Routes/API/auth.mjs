import express from "express";
import auth from "../../Middleware/auth.mjs";
import User from "../../Models/User.mjs";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(501).send("Server Error");
	}
});

router.post(
	"/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json(errors.array());
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ message: "Invalid credentials" }] });
			}
			const payload = {
				user: {
					id: user.id,
				},
			};
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res
					.status(400)
					.json({ errors: [{ message: "Invalid credentials" }] });
			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);

export default router;
