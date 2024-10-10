import { Schema } from "mongoose";
import postModel, { IPost } from "../models/postModel";
import userModel from "../models/userModel";

export const createPostService = async (post: IPost, author:string): Promise<IPost> => {
  try {
    const { title, content } = post;
    if (!title || !content) {
      throw new Error("missing info");
    }
    //find the author
    const theAuthor = await userModel.findById(author);
    //if not exist return eror
    if (!theAuthor) throw new Error("no user with this id");
    const dbPosts = new postModel({
      title,
      content,
      author,
    });
    const seavedPost:IPost = await dbPosts.save();
    theAuthor.posts?.push(seavedPost._id as Schema.Types.ObjectId);
    await theAuthor.save();
    return seavedPost;
  } catch (err: any) {
    throw err;
  }
};
