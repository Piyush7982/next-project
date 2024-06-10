"use server";
import { auth } from "@/auth";
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

export async function checkIsRegistered() {
  const session = await auth();
  var userId = session?.user?.id;
  const registration = await User.findById(userId).select({
    registrationCompleted: 1,
  });

  return Boolean(registration?.registrationCompleted);
}
