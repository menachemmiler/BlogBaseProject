import { NextFunction, Router } from "express";
import { createUser, profile, getUsers } from "../controllers/userController";
import authMidelware from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", authMidelware as unknown as NextFunction, getUsers); //רק משתמש מחובר יכול לראות את כולם
userRouter.get("/profile", authMidelware as unknown as NextFunction, profile);

export default userRouter;
