import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment {
  //המבנה של הערה
  content: string; //התוכן של הערה
  author: Types.ObjectId; //הערה מקושרת למזהה של היוצר שלה
  createdAt: Date; //תאריך יצירת ההודעה
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; //הערה מקושרת למזהה של היוצר שלה
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  //סכמה של הערה (סוג של מבנה שמוכר למונגו)
  content: {
    type: String,
    required: [true, "content is required!"],
  },
  author: {
    type: Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: [true, "date is required!"],
  },
});

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, "title is required!"],
    minlength: [4, "title to be at last 4 chars"],
  },
  content: {
    type: String,
    required: [true, "content is required!"],
  },
  author: {
    type: Schema.ObjectId,
    ref: "User",
  },
  comments: {
    type: [CommentSchema], //פוסט מכיל מערך של הערות
  },
});

export default mongoose.model<IPost>("Post", PostSchema);
