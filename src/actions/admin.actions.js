"use server";
import { connecToDb } from "@/lib/connectToDb";
import { Approval } from "@/lib/models/approval.schema";
import { User } from "@/lib/models/user.schema";
import { updateItem } from "./items.actions";
import { revalidatePath } from "next/cache";

export async function fetchAdmins() {
  try {
    connecToDb();
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
    connecToDb();
    const del = await User.deleteOne({ username: username });
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchUserByUserName(username) {
  try {
    connecToDb();
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    });
    // console.log(users);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchAdminDetails(id) {
  try {
    connecToDb();
    const data = await User.findById(id).select({
      _id: 1,
      email: 1,
      username: 1,
    });

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function promoteAdmin(username) {
  try {
    connecToDb();
    const del = await User.findOneAndUpdate(
      { username: username },
      { role: "Admin" }
    );
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchPendingProductApprovals(page) {
  try {
    connecToDb();
    const approvals = await Approval.find({ approvalStatus: "Pending" })
      .skip(page * 7)
      .limit(7)
      .populate("Model", { name: 1 })
      .populate("lender", { username: 1 });
    return approvals;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function processApprovalRequest(id, type, action) {
  try {
    await connecToDb();
    const status = action === "Approve" ? "Approved" : "Declined";
    const data = await Approval.findByIdAndUpdate(id, {
      approvalStatus: status,
    });
    await updateItem(data?.onModel, data?.Model, { approvalStatus: status });
  } catch (error) {
    console.log(error);
    return;
  }
  revalidatePath("/admin/update");
}
export async function checkIfAlreadyProcessed(id) {
  try {
    await connecToDb();
    const approval = await Approval.findById(id);

    if (approval?.approvalStatus !== "Pending") {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
