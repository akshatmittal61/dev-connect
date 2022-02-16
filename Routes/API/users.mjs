import express from "express";
import { check, validationResult } from "express-validator";
import User from "../../Models/User.mjs";
import gravatar from "gravatar";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a Password of 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json(errors.array());
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if(user){
				return res.status(400).json({errors: [{message: 'User already registered'}]})
			}
			const avatar=gravatar.url(email,{
				s: 200,
				r: 'pg',
				d: 'mm'
			})
			user=new User({name,email,avatar,password})
			user.password=await bcrypt.hash(password,10)
			await user.save()
			const payload={
				user:{
					id: user.id
				}
			}
			jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: 360000},(err,token)=>{
				if(err)throw err;
				res.json({token})
			})
		} catch (err) {
			console.error(err);
			res.status(500).send("Server error");
		}
	}
);

export default router;
