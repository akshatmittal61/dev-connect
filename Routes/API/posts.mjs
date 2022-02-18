import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../../Middleware/auth.mjs";
import Post from "../../Models/Post.mjs";
import Profile from "../../Models/Profile.mjs";
import User from "../../Models/User.mjs";
const router = express.Router();

router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) res.json({ errors: errors.array() });
		try {
			const user = await User.findById(req.user.id).select("-password");
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});
			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

export default router;
