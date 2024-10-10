import { Request, Response } from "express";
import { createUserService, getAllUsersService } from "../services/userService";
import { IUser } from "../models/userModel";

export const createUser = async (
  req: Request<any, any, IUser>,
  res: Response
) => {
  try {
    const savedUser: IUser | unknown = await createUserService(req.body);
    res.status(201).json(savedUser);
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

export const profile = async (req: Request, res: Response) => {
  res.send("יקבל את הפרופיל שלו (צריך לבצע הרשמה קודם)");
};

// Optionally, add DELETE and EDIT functions
