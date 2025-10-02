import { SectionCards } from "@/components/card-section";
import { SiteHeader } from "@/components/site-header";
import { columns } from "@/components/transactions-table/columns";
import { DataTable } from "@/components/transactions-table/data-table";
import {
  getTransactionAnalyticsByCategory,
  getTransactions,
} from "@/lib/action";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import React, { Suspense } from "react";

const ExpensePage = async () => {
  const data = await getTransactions("Expense");
  const amount = await getTransactionAnalyticsByCategory("Expense");
  return (
    <>
      <SiteHeader title={"Expense"} />
      <div className="flex flex-col flex-1 gap-4 p-4 ">
        <div className="grid gap-4 auto-rows-min md:grid-cols-3">
          <SectionCards
            title={"Today"}
            amount={amount.amountToday}
            Icon={DollarSign}
          />
          <SectionCards
            title={"Last Day"}
            amount={amount.amountYesterday}
            Icon={TrendingUp}
          />
          <SectionCards
            title={"Last 7 Day"}
            amount={amount.amountLast7Days}
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

export default ExpensePage;
