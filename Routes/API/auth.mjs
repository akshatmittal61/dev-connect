import express from "express";
import auth from "../../Middleware/auth.mjs";
import User from "../../Models/User.mjs";
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

export default router;
