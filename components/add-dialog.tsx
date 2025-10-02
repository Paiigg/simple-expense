"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";

import TransactionsForm from "@/components/transactions-form";

export function AddDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-primary ">
          <Plus className="size-5" />
          <span className="hidden font-semibold md:inline-block">
            {" "}
            Add Transactions
          </span>
        </Button>
      </DialogTrigger>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transactions</DialogTitle>
          <DialogDescription>
            Add your transaction here. Click add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <TransactionsForm />
      </DialogContent>
      {/* </form>
      </Form> */}
    </Dialog>
  );
}
