import { model, Schema } from "mongoose";

interface User {
  username: string;
  email: string;
  age: number;
  city: "Paris" | "Tokyo" | "Los Angeles";
}

export const UserModel = model(
  "User",
  new Schema<User>({
    username: {
      type: String,
      required: true,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      match: [/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Invalid email"],
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
