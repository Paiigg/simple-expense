import { Transaction } from "@/components/transactions-table/columns";

export const getTotalIncomeAmount = (data: Transaction[]) => {
  const filteredIncomeAmount = data
    .filter((transaction) => {
      return transaction.categories == "Income";
    })
    .reduce((total, transaction) => total + transaction.amount, 0);
  return filteredIncomeAmount;
};

export const getTotalExpenseAmount = (data: Transaction[]) => {
  const filteredExpenseAmount = data
    .filter((transaction) => {
      return transaction.categories == "Expense";
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  return filteredExpenseAmount;
};

export function getStartAndEndOfDay(daysBack: number = 0) {
  const today = new Date();
  const targetDay = new Date(today);
  targetDay.setDate(today.getDate() - daysBack);

  const startOfDay = new Date(targetDay);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDay);
  endOfDay.setHours(23, 59, 59, 999);

  return { start: startOfDay, end: endOfDay };
}

