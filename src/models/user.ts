import { model, Schema } from "mongoose";

export const UserModel = model(
  "User",
  new Schema({
    username: {
      type: String,
      required: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 10,
      max: 100,
    },
    city: {
      type: String,
      required: true,
      enum: ["Paris", "Tokyo", "Los Angeles"],
    },
  })
);
