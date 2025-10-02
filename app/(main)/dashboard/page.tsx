import { SectionCards } from "@/components/card-section";
import { SiteHeader } from "@/components/site-header";
import { columns } from "@/components/transactions-table/columns";
import { DataTable } from "@/components/transactions-table/data-table";
import React, { Suspense } from "react";
import { getTransactions } from "@/lib/action";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import {
  getTotalExpenseAmount,
  getTotalIncomeAmount,
} from "@/utils/transactionTotal";

const DashboardPage = async () => {
  const data = await getTransactions();
  const totalIncome = getTotalIncomeAmount(data);
  const totalExpense = getTotalExpenseAmount(data);
  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <SiteHeader title={"Dashboard"} />
      <div className="flex flex-col flex-1 gap-4 p-4 ">
        <div className="grid gap-4 auto-rows-min md:grid-cols-3">
          <SectionCards
            title={"Balance"}
            amount={totalBalance}
            Icon={DollarSign}
          />
          <SectionCards
            title={"Income"}
            amount={totalIncome}
            Icon={TrendingUp}
          />
          <SectionCards
            title={"Expense"}
            amount={totalExpense}
            Icon={TrendingDown}
          />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Suspense fallback="Loading...">
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
