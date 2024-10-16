import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";
import User from "../models/userModel";
import { createPostService } from "../services/postService";
import AuthenticatedRequest from "../types/authenticatedRequest";
import { Schema, Types } from "mongoose";

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
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    await User.findByIdAndUpdate(deletedPost.author, {
      $pull: { posts: deletedPost._id },
    }); //מוחק מ-פוסטים את מי שתואם למזהה של הפוסט שנמחק
    res.status(204).json({ success: true, data: null });
  } catch (err: any) {
    res.status(err.status | 400).send({
      err: err.message,
    });
  }
};

// Get all posts
export const getPosts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err: any) {
    res.status(err.status | 400).send({
      err: err.message,
    });
  }
};

// Get a single post by ID
export const getPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.params.id);
    const posts: IPost | null = await Post.findById(req.params.id);
    if (!posts) throw new Error("no post with this id!");
    res.status(200).json(posts);
  } catch (err: any) {
    res.status(err.status | 400).send({
      err: err.message,
    });
  }
};

// Update a post
export const updatePost = async (
  req: AuthenticatedRequest<IPost>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) throw new Error("no post with this id!");
    const { title, content } = req.body;
    if (!title || !content) throw new Error("missing info");
    posts.title = title;
    posts.content = content;
    const savedPost: IPost = await posts.save();
    res.status(200).json(savedPost);
  } catch (err: any) {
    res.status(err.status | 400).send({
      err: err.message,
    });
  }
};

// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
