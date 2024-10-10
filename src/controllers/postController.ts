import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import { createPostService } from "../services/postService";

// Create a new post
export const createPost = async (
  req: Request<any, any, IPost>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await createPostService(req.body);
    res.status(201).json({
      msg: "post created!",
    });
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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

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
