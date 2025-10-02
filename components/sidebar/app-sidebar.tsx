import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarList from "@/components/sidebar/sidebar-menu";
import { Shredder } from "lucide-react";
import Link from "next/link";
import { SidebarUser } from "@/components/sidebar/sidebar-user";

import { auth } from "@/lib/auth";

export async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground aspect-square size-8">
                  <Shredder className="size-4" />
                </div>
                <span className="font-semibold text-xl">
                  Hi, {session?.user.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
