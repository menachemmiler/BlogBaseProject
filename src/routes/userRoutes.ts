import { Router } from "express";
import { createUser, profile, getUsers } from "../controllers/userController";
import authMidelware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", authMidelware, getUsers); //רק משתמש מחובר יכול לראות את כולם
userRouter.get("/profile", authMidelware, profile);

export default userRouter;
