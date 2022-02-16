import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
const app = express();
const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_CONNECTION_STRING);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
