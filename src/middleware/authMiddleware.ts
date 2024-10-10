import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface PayloadRequest extends Request {
  user: JwtPayload;
}

const authMidelware = async (
  req: PayloadRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).send("Not allowed");
    }

    const userData = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    req.user = userData;

    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export default authMidelware;
