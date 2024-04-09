"use server";
import { connecToDb } from "@/lib/connectToDb";
import { User } from "@/lib/models/user.schema";

connecToDb();

export async function fetchAdmins() {
  try {
    const admins = await User.find({ role: "Admin" }).sort({ username: 1 });
    return admins;
    // console.log(admins);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteAdmin(username) {
  try {
    const del = await User.deleteOne({ username: username });
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserByUserName(username) {
  try {
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });
    console.log(users);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
