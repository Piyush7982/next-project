import z from "zod";

const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
const emailRegex =
  /^(?=.*[a-zA-Z])[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

export const zodUserSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .refine((value) => emailRegex.test(value), {
      message: "Email must  be in a valid format",
    })
    .refine((value) => value.length >= 5 && value.length <= 35, {
      message: "Email must be between 5 and 35 characters",
    }),
  username: z
    .string()
    .refine((value) => usernameRegex.test(value), {
      message: "Username must be alphnumeric",
    })
    .refine((value) => value.length >= 5 && value.length <= 20, {
      message: "Username must be between 5 and 20 characters",
    }),
  password: z
    .string()
    .refine((value) => value.length >= 8 && value.length <= 20, {
      message: "Password must be between 8 and 20 characters",
    }),
  role: z.enum(["Buyer", "Seller", "Admin"]).default("Buyer"),
});

export const zodLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
