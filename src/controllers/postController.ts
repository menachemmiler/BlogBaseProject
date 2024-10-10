import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import { createPostService } from "../services/postService";
import AuthenticatedRequest from "../types/authenticatedRequest";

// Create a new post
export const createPost = async (
  req: AuthenticatedRequest<IPost>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const seavedPost: IPost | unknown = await createPostService(
      req.body,
      req.user._id || ""
    );
    res.status(201).json(seavedPost);
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// Get all posts
export const getPosts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    throw err;
  }
};

// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
