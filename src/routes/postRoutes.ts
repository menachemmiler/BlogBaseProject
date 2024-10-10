import { NextFunction, Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addComment,
} from "../controllers/postController";
import authMidelware from "../middleware/authMiddleware";

const postRouter = Router();

postRouter.post(
  "/",
  authMidelware as unknown as NextFunction,
  createPost as any
);
postRouter.get("/", authMidelware as unknown as NextFunction, getPosts as any);
postRouter.get("/:id", getPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.post("/:id/comments", addComment);

export default postRouter;
