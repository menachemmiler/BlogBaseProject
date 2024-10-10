import { Request, Response } from "express";
import { loginUser } from "../services/authService";
import paloadTokenDTO from "../types/DTO/paloadTokenDTO";

export const login = async (
  req: Request<any, any, paloadTokenDTO>,
  res: Response
): Promise<void> => {
  try {
    const token = await loginUser(req.body);
    res.cookie("token", token);
    res.json({
      msg: `welcome ${req.body.username} token=${token}`,
    });
  } catch (err: any) {
    res.json({
      msg: err.message,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("token", "");
    res.json({
      msg: "הטוקן נמחק בהצלחה",
    });
  } catch (err: any) {
    res.json({
      msg: err.message,
    });
  }
};
