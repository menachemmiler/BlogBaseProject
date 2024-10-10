import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";
import authRout from "./routes/authRoute"
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import cookieParser  from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser()); //


connectDB();

// Routes
app.use("api/auth", authRout);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
