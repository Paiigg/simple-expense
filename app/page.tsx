import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex items-center justify-center flex-col gap-4 px-4">
      <h1 className="text-5xl font-bold text-center">
        Simple Expense <span className="text-primary">App</span>
      </h1>
      <p className="text-muted-foreground text-sm italic">
        Track your money flow
      </p>
      <div className="flex items-center gap-2">
        <Button className="text-white min-w-[150px]" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button className="text-white min-w-[150px]" variant="outline" asChild>
          <Link href="/register">SignUp</Link>
        </Button>
      </div>
    </div>
  );
}
