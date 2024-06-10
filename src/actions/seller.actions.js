"use server";

import { Approval } from "@/lib/models/approval.schema";
import { revalidatePath } from "next/cache";

const { connecToDb } = require("@/lib/connectToDb");
const { Request } = require("@/lib/models/Request.schema");

export async function fetchRequests(userId) {
  let requests = [];
  try {
    await connecToDb();
    requests = await Request.find({
      lender: userId,
      approvalStatus: "Pending",
    }).populate("Model", {
      name: 1,
    });
    return requests;
  } catch (error) {
    console.log(error);
    return requests;
  }
}
export async function fetchCompleteProductData(productId) {
  let result = "";
  try {
    await connecToDb();
    result = await Request.findOne({ Model: productId }).populate("Model", {
      tags: 0,
      available: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return result;
  }
}
export async function updateRequestStatus(productId, status) {
  try {
    await connecToDb();

    const requests = await Request.findOneAndUpdate(
      { Model: productId },
      {
        approvalStatus: status,
      }
    );

    return;
  } catch (error) {
    console.log(error);
    return;
  } finally {
    revalidatePath("/dashboard");
  }
}
export async function createAdminApproval(productId, lender, onModel) {
  try {
    await connecToDb();

    const approval = await Approval.create({
      onModel: onModel,
      Model: productId,
      lender: lender,
    });

    return;
  } catch (error) {
    console.log(error);
    return;
  }
}
