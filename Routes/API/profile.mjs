import express from "express";
import { check, validationResult } from "express-validator";
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

router.post(
	"/",
	[
		auth,
		[
			check("status", "Status is required").not().isEmpty(),
			check("skills", "Skills are required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		const {
			company,
			website,
			location,
			bio,
			status,
			githubUsername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubUsername) profileFields.githubUsername = githubUsername;
		if (skills) {
			profileFields.skills = skills
				.split(",")
				.map((skill) => skill.trim());
		}
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			const newProfile = new Profile(profileFields);
			newProfile.save();
			res.json(newProfile);
		} catch (err) {
			console.error(err);
			res.status(500).send("Server Error");
		}
	}
);

export default router;
