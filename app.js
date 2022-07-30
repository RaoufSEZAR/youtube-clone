import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentsRoutes.js";
import cookie from "cookie-parser";

const app = express();
dotenv.config();

// db connect
const dbConnection = () => {
	mongoose.connect(process.env.MONGO_URL).then((conn) => {
		console.log(`Database Connected: ${conn.connection.host}`);
	});
};

app.use(cookie());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// error handler
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "Something went wrong";
	return res.status(status).json({
		sucess: false,
		status,
		message,
	});
});
app.listen(process.env.PORT, () => {
	dbConnection();
	console.log("connected");
});
