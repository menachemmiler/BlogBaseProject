import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



const authMidelware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // @ts-ignore
    const token:string = req.cookies.token;

    if (!token) {
      res.status(403).send("Not allowed");
    }

    const userData = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    //@ts-ignore
    req.user = userData;
    console.log({ userData });

    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export default authMidelware;
