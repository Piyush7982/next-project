import { successResponse } from "@/lib/utils/success.response";
import { errorResponse } from "@/lib/utils/error.response";
import { StatusCodes } from "http-status-codes";
import { connecToDb } from "@/lib/connectToDb";
import {
  zodFlatInputSchema,
  zodStationaryInputSchema,
} from "@/lib/models/zod .schema";
import { Stationary } from "@/lib/models/stationary.schema";
import { Flat } from "@/lib/models/flat.schema";
import { User } from "@/lib/models/user.schema";
import { auth } from "@/auth";
import { fromZodError } from "zod-validation-error";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return redirect("/login");
    }
    const data = await req.json();
    const model = data?.model === "Flat" ? Flat : Stationary;
    const validatedInput =
      data?.model === "Flat"
        ? zodFlatInputSchema.safeParse(data)
        : zodStationaryInputSchema.safeParse(data);

    if (!validatedInput.success) {
      const validationError = fromZodError(validatedInput.error);

      return errorResponse(
        validationError.details[0].message,
        validationError.name,
        StatusCodes.BAD_REQUEST
      );
    }
    const username = session?.user?.username;

    await connecToDb();

    const isValidUser = await User.findOne({ username: username });
    if (!isValidUser || isValidUser?.role !== "Seller") {
      return errorResponse(
        "Not a valid User",
        "Authentication Error",
        StatusCodes.UNAUTHORIZED
      );
    }
    const result = await model.create({ ...data, lender: isValidUser?._id });
    // console.log(result);

    return successResponse(
      "Succesfully Created",
      "Created",
      StatusCodes.ACCEPTED
    );
  } catch (error) {
    return errorResponse(error.message, error.type, error.statusCode);
  }
}
