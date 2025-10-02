import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Transaction } from "./columns";
import TransactionsForm from "../transactions-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteTransactionAction } from "@/lib/action";

interface TransactionFormProps {
  transaction?: Transaction;
}

const handleDelete = async (id: string | undefined) => {
  await deleteTransactionAction(id);
};

export function TransactionActions<TData>({
  transaction,
}: TransactionFormProps) {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="bg-orange-500 hover:bg-orange-500/90">
            <Pencil className="size-5" color="#fff" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Transactions</DialogTitle>
            <DialogDescription>
              Edit your transaction here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <TransactionsForm transaction={transaction} />
        </DialogContent>
      </Dialog>
      <Button
        size="icon"
        className="bg-destructive hover:bg-destructive/80 "
        onClick={() => handleDelete(transaction?.id)}
      >
        <Trash2 className="size-5" color="#fff" />
      </Button>
    </div>
  );
}
