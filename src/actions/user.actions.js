"use server";
import { connecToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models/user.schema";

connecToDb();

export async function fetchUserDataByUsername(username) {
  try {
    const user = await User.findOne({ username: username }).select({
      password: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      registrationCompleted: 0,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
