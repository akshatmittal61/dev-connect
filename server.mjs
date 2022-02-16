import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import apiUsers from "./Routes/API/users.mjs";
import apiAuth from "./Routes/API/auth.mjs";
import apiProfile from "./Routes/API/profile.mjs";
import apiPosts from "./Routes/API/posts.mjs";
config();
const app = express();
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
		console.log("Connected to MongoDB successfuly");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};
connectDB();

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.use("/api/users", apiUsers);
app.use("/api/auth", apiAuth);
app.use("/api/profile", apiProfile);
app.use("/api/posts", apiPosts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
