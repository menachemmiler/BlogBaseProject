import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import TokenPaloadDTO from "../types/DTO/paloadTokenDTO";
import AuthenticatedRequest from "../types/authenticatedRequest";



const authMidelware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction  
): Promise<void> => {
  try {
    
    const token:string = req.cookies.token || "";
    
    if (!token) {
      res.status(403).send("Not allowed");
    }

    const userData = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as TokenPaloadDTO;

    
    req.user = userData;
    console.log({ userData });

    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

export default authMidelware;
