import { Request, Response } from "express";
import { createUserService, getAllUsersService } from "../services/userService";
import { IUser } from "../models/userModel";

export const createUser = async (
  req: Request<any, any, IUser>,
  res: Response
) => {
  try {
    await createUserService(req.body);
    res.status(201).json({
      msg: "user created!",
    });
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await getAllUsersService();
    if (!allUser) throw new Error("no users!");
    res.status(202).json({
      msg: "all users!",
      data: allUser,
    });
  } catch (err: any) {
    res.status(400).json({ msg: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {};

// Optionally, add DELETE and EDIT functions
