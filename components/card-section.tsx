// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Transaction } from "./transactions-table/columns";
import { Button } from "./ui/button";

interface CardProps {
  title: string;
  amount: number;
  Icon: LucideIcon;
}
export function SectionCards({ title, amount, Icon }: CardProps) {


  return (
    <Card className="@container/card bg-sidebar border-none">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Rp {amount.toLocaleString("id-ID")}
        </CardTitle>
        <CardAction>
          <Button variant="outline" size="icon">
            <Icon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex gap-2 font-medium line-clamp-1">Total {title}</div>
        <div className="text-muted-foreground">Your total {title}</div>
      </CardFooter>
    </Card>
  );
}
