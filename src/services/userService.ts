import userModel, { IUser } from "../models/userModel";

export const createUserService = async (user: IUser): Promise<void> => {
  try {
    const { username, email, profile, posts } = user;
    if (!username || !email) {
      throw new Error("missing info");
    }
    const dbUser = new userModel({
      username,
      email,
    });
    await dbUser.save();
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const getAllUsersService = async (): Promise<IUser[]> => {
  try {
    // const allUsers = await userModel.find({}).populate('posts');
    const allUsers = await userModel.find({});
    console.log("allUsers= ", allUsers);
    return allUsers;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};
