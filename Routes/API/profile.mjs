import express from "express";
import { check, validationResult } from "express-validator";
import auth from "../../Middleware/auth.mjs";
import Profile from "../../Models/Profile.mjs";
import User from "../../Models/User.mjs";
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

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", [
			"name",
			"avatar",
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);
		if (!profile)
			return res.status(400).json({ message: "Profile not found" });
		res.json(profile);
	} catch (err) {
		console.error(err);
		if (err.kind === "ObjectId")
			return res.status(400).json({ message: "Profile not found" });
		res.status(500).send("Server error");
	}
});

router.delete("/", auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ message: "User removed" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

router.put(
	"/experience",
	[
		auth,
		[
			check("title", "Title is required").not().isEmpty(),
			check("company", "Company is required").not().isEmpty(),
			check("from", "From Date is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		const { title, company, location, from, to, current, description } =
			req.body;
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);

router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const remIndex = profile.experience
			.map((a) => a.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(remIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

router.put(
	"/education",
	[
		auth,
		[
			check("school", "School is required").not().isEmpty(),
			check("degree", "Degree is required").not().isEmpty(),
			check("from", "From Date is required").not().isEmpty(),
			check("fieldOfStudy", "Field of Study is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		const { school, degree, fieldOfStudy, from, to, current, description } =
			req.body;
		const newEdu = {
			school,
			degree,
			fieldOfStudy,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);

router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const remIndex = profile.education
			.map((a) => a.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(remIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

export default router;
