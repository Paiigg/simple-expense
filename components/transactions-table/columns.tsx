"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { CircleCheck, ClockAlert, Loader, MoreHorizontal } from "lucide-react";

import { TransactionActions } from "./transaction-action";
import { Badge } from "../ui/badge";

export type Transaction = {
  id: string;
  text: string;
  categories: string;
  status: string;
  amount: number;
  transactionDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const date: Date = new Date(row.original.transactionDate);
      return format(date, "EEEE, dd MMMM yyyy", { locale: id });
      // contoh output: Selasa, 23 September 2025
    },
  },
  {
    accessorKey: "text",
    header: () => <div className="">Description</div>,
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("text")}</div>;
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      switch (row.original.status) {
        case "Un Paid":
          return (
            <Badge
              variant="outline"
              className="text-xs font-medium text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300"
            >
              <ClockAlert />

              {row.original.status}
            </Badge>
          );
        case "In Progress":
          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <Loader />
              {row.original.status}
            </Badge>
          );
        case "Paid":
          return (
            <Badge
              variant="outline"
              className="text-xs px-1.5 font-medium text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300"
            >
              <CircleCheck />
              {row.original.status}
            </Badge>
          );
        default:
          break;
      }
    },
  },
  {
    accessorKey: "categories",
    header: () => <div className="">Categories</div>,
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("categories")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-end">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const categories = row.getValue("categories") as string;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return categories === "Expense" ? (
        <div className="font-medium text-end">- {formatted}</div>
      ) : (
        <div className="font-medium text-end">{formatted}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transactions = row.original;

      return <TransactionActions transaction={transactions} />;
    },
  },
];

// export const columns: ColumnDef<z.infer<typeof transactionsSchema>>[] = [
//   {
//     accessorKey: "transactionDate",
//     header: "Date",
//     cell: ({ row }) => {
//       const date: Date = new Date(row.getValue("transactionDate"));
//       return format(date, "EEEE, dd MMMM yyyy", { locale: id });
//       // contoh output: Selasa, 23 September 2025
//     },
//   },
//   {
//     accessorKey: "text",
//     header: "Description",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "categories",
//     header: "Categories",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));
//       const categories = row.getValue("categories") as string;
//       const formatted = new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//       }).format(amount);

//       return categories === "expense" ? `-${formatted}` : formatted;
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const transactions = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="w-8 h-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="w-4 h-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(transactions.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
