'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { GoSignOut } from "react-icons/go";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Settings,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Resume Analyzer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuButton asChild key={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ))}
              <div className="cursor-pointer hover:backdrop-blur-2xl rounded-sm hover:bg-[#262626] flex items-center px-2 py-2 gap-2 text-left ">
                <SidebarMenuItem>
                  <SignedIn>
                    <SignOutButton redirectUrl="/sign-up">
                      <button className="cursor-pointer hover:bg-[#262626] rounded-sm px-2 py-2 w-full text-left">
                        <div className="flex items-center gap-2">
                          <GoSignOut />
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </SignOutButton>
                  </SignedIn>
                </SidebarMenuItem>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
