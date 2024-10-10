import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IProfile extends Document {
  bio?: string; //פריטים על המשתמש
  socialLinks?: string[]; //לינקים קשורים למשתמש
}

const ProfileSchema = new Schema({
  bio: {
    type: String,
  },
  socialLinks: {
    type: String,
  },
});

export interface IUser extends Document {
  //אינ טרפייס של משתמש במערכת
  username: string; //שם
  email: string; //מייל
  profile?: IProfile; //
  posts?: Schema.Types.ObjectId[]; //
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "username is required!"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
  },
  profile: {
    type: ProfileSchema,
    default: {},
  },
  posts: {
    //משתמש מחזיק מערך של פוסטים )רפרנסים(
    type: [Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
});

export default mongoose.model<IUser>("User", UserSchema);
