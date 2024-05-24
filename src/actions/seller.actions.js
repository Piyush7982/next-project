"use server";

const { connecToDb } = require("@/lib/connectToDb");
const { Request } = require("@/lib/models/Request.schema");

export async function fetchRequests(userId) {
  let requests = [];
  try {
    await connecToDb();
    requests = await Request.find({ lender: userId }).populate("Model", {
      name: 1,
    });
    return requests;
  } catch (error) {
    console.log(error);
    return requests;
  }
}
export async function fetchCompleteProductData(productId) {
  try {
    // console.log(productId);
    const result = await Request.find({ Model: productId }).populate("Model", {
      tags: 0,
      available: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
