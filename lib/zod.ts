import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, {
      error: "Username must be at least 2 characters.",
    })
    .max(50),
  email: z.email({
    error: "Invalid Email",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be more than 8 character",
    })
    .max(32, { error: "Password must be less than 32 character" }),
});

export const loginSchema = z.object({
  email: z.email({
    error: "Invalid Email",
  }),
  password: z
    .string()
    .min(8, {
      error: "Password must be more than 8 character",
    })
    .max(32, { error: "Password must be less than 32 character" }),
});

export const transactionsSchema = z.object({
  text: z.string().min(1, { error: "Text is required" }),

  // categories: z.literal(["Income", "Expense"], {
  //   error: "Category is required",
  // }),

  categories: z.string({
    error: (issue) =>
      issue.input === undefined ? "This field is required" : "Not a string",
  }),

  status: z.string({
    error: (issue) =>
      issue.input === undefined ? "This field is required" : "Not a string",
  }),

  amount: z.coerce
    .number<number>()
    .gte(0, { error: "Amount must more than 0" }),

  transactionDate: z.date({
    error: "Date is required",
  }),
});
