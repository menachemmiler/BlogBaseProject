import { Router } from "express";
import { createUser, profile, getUsers } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/profile", profile);

export default userRouter;
