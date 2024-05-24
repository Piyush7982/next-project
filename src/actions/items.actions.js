"use server";

const { connecToDb } = require("@/lib/connectToDb");
const { Stationary } = require("@/lib/models/stationary.schema");
connecToDb();

export async function fetchBooks(page, limit) {
  try {
    const books = await Stationary.find()
      .limit(limit)
      .skip((page - 1) * limit);
    return books;

    // console.log(answer);
  } catch (error) {
    console.log(error);
  }
}
export async function getTotalBooks() {
  try {
    const totalbooks = await Stationary.countDocuments();
    return totalbooks;
  } catch (error) {
    console.log(error);
  }
}
