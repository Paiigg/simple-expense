"use client";

import React from "react";
import { Home, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: BanknoteArrowUp,
  },
  {
    title: "Expense",
    url: "/dashboard/expense",
    icon: BanknoteArrowDown,
  },
];

const SidebarList = () => {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`${
              pathname == item.url
                ? "text-primary font-semibold hover:text-primary bg-sidebar-accent "
                : null
            } `}
          >
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarList;
