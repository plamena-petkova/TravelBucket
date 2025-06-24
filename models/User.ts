import { Schema, model, models } from "mongoose";


const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exist!"],
      required: [true, "Email is required!"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    password: {
      type: String,
      required:  [true, 'Password min 5 characters long is required'],
      min:5, 
      max:20,
      unique: true,
    },
    avatarUrl: {
      type: String,
    },
    trips: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trip",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
