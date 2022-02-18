import express from "express";
import auth from "../../Middleware/auth.mjs";
import Profile from "../../Models/Profile.mjs";
const router = express.Router();

router.get("/me", auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar"]
		);
		if (!profile)
			return res
				.status(400)
				.json({ message: "There is no profle for this user" });
		res.json(profile);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});

export default router;
