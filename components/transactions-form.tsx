import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addTransactionsAction, editTransactionsAction } from "@/lib/action";
import { transactionsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Transaction } from "./transactions-table/columns";

interface TransactionFormProps {
  transaction?: Transaction;
}

const TransactionsForm = ({ transaction }: TransactionFormProps) => {
  const form = useForm<z.infer<typeof transactionsSchema>>({
    resolver: zodResolver(transactionsSchema),
    defaultValues: {
      text: transaction?.text || "",
      amount: transaction?.amount || 0,
      categories: transaction?.categories || undefined,
      status: transaction?.status || undefined,
      transactionDate: transaction?.transactionDate || new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof transactionsSchema>) => {
    if (transaction) {
      await editTransactionsAction(transaction.id, values);
      form.reset();
    } else {
      await addTransactionsAction(values);
      form.reset();
    }

    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Food" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount your transactions."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Un Paid">Un Paid </SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick a date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <ChevronDown className="ml-auto" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1990-01-01")
                          }
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {transaction ? (
            <DialogClose asChild>
              <Button
                type="submit"
                className="text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Edit"}
              </Button>
            </DialogClose>
          ) : (
            <DialogClose asChild>
              <Button
                type="submit"
                className="text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Add"}
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TransactionsForm;
