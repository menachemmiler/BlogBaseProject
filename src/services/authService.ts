import userModel from "../models/userModel";
import jsonwebtoken from "jsonwebtoken";
import TokenPaloadDTO from "../types/DTO/paloadTokenDTO";


export const loginUser = async (userDetailse: TokenPaloadDTO): Promise<string> => {
  try {
    const dbUser = await userModel.findOne({ user_name: userDetailse.username });
    if (!dbUser) {
      throw new Error("User not found");
    }

    const token = jsonwebtoken.sign(
      {
        user_name: dbUser.username,
        password: dbUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3m",
      }
    );

    return token;
  } catch (err: any) {
    throw err;
  }
};
