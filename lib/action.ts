"use server";
import { loginSchema, registerSchema, transactionsSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { Transaction } from "@/components/transactions-table/columns";
import { getStartAndEndOfDay } from "@/utils/transactionTotal";

interface AnalyticsByCategory {
  amountToday: number;
  amountYesterday: number;
  amountLast7Days: number;
}

export const signUpCredentials = async (
  unsafeData: z.infer<typeof registerSchema>
) => {
  const validateFields = registerSchema.safeParse(unsafeData);
  if (!validateFields.success) {
    return {
      error: z.prettifyError(validateFields.error),
    };
  }
  const { name, email, password } = validateFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (error) {
    return { error: true, message: "Failed to register user" };
  }
  redirect("/login");
};

export const loginCredentials = async (
  unsafeData: z.infer<typeof loginSchema>
) => {
  const validateFields = loginSchema.safeParse(unsafeData);
  if (!validateFields.success) {
    return {
      error: z.prettifyError(validateFields.error),
    };
  }
  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: true, message: "Invalid Credentials." };

        default:
          return { error: true, message: "Something went wrong." };
      }
    }
    throw error;
  }
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/login" });
};

export const addTransactionsAction = async (
  unsafeData: z.infer<typeof transactionsSchema>
) => {
  const session = await auth();

  const validateFields = transactionsSchema.safeParse(unsafeData);

 

  if (!validateFields.success) {
    return {
      error: z.prettifyError(validateFields.error),
    };
  }
  const { text, categories, status, amount, transactionDate } =
    validateFields.data;

  if (!session?.user?.id) {
    return { error: true, message: "User not authenticated" };
  }

  try {
    await prisma.transactions.create({
      data: {
        text,
        categories,
        status,
        amount,
        transactionDate,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { error: true, message: "Failed to add transaction" };
    // }
  }
  revalidatePath("/dashboard");
};

export const getTransactions = async (
  category?: string
): Promise<Transaction[]> => {
  const session = await auth();

  try {
    const transactions = await prisma.transactions.findMany({
      where: { userId: session?.user.id, categories: category },
      orderBy: {
        createdAt: "desc", // urutkan dari terbaru
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Gagal mengambil data transaksi");
  }
};

export const deleteTransactionAction = async (id: string | undefined) => {
  await prisma.transactions.delete({ where: { id } });
  revalidatePath("/dashboard");
};

export const editTransactionsAction = async (
  id: string,
  unsafeData: z.infer<typeof transactionsSchema>
) => {
  const validateFields = transactionsSchema.safeParse(unsafeData);

  if (!validateFields.success) {
    return {
      error: z.prettifyError(validateFields.error),
    };
  }
  const { text, categories, status, amount, transactionDate } =
    validateFields.data;

  try {
    await prisma.transactions.update({
      where: { id },
      data: {
        text,
        categories,
        status,
        amount,
        transactionDate,
      },
    });
  } catch (error) {
    return { error: true, message: "Failed to edit transaction" };
    // }
  }
  revalidatePath("/dashboard");
};

// 📈 Get analytics separated by income/expense categories
export const getTransactionAnalyticsByCategory = async (
  category: string
): Promise<AnalyticsByCategory> => {
  const session = await auth();

  try {
    // Get date ranges
    const today = getStartAndEndOfDay(0);
    const yesterday = getStartAndEndOfDay(1);
    const sevenDaysAgo = getStartAndEndOfDay(7);
  

    // Fetch INCOME transactions
    const [todayAmount, yesterdayAmount, last7DaysAmount] = await Promise.all([
      prisma.transactions.findMany({
        where: {
          userId: session?.user.id,
          categories: category,
          transactionDate: {
            gte: today.start,
            lte: today.end,
          },
        },
        select: { amount: true },
      }),

      prisma.transactions.findMany({
        where: {
          userId: session?.user.id,
          categories: category,
          transactionDate: {
            gte: yesterday.start,
            lte: yesterday.end,
          },
        },
        select: { amount: true },
      }),

      prisma.transactions.findMany({
        where: {
          userId: session?.user.id,
          categories: category,
          transactionDate: {
            gte: sevenDaysAgo.start,
            lte: yesterday.end,
          },
        },
        select: { amount: true },
      }),
    ]);

    return {
      amountToday: todayAmount.reduce((sum, t) => sum + t.amount, 0),
      amountYesterday: yesterdayAmount.reduce((sum, t) => sum + t.amount, 0),
      amountLast7Days: last7DaysAmount.reduce((sum, t) => sum + t.amount, 0),
    };
  } catch (error) {
    console.error("Error fetching transaction analytics by category:", error);
    throw new Error("Gagal mengambil analitik transaksi berdasarkan kategori");
  }
};
