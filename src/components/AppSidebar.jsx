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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="cursor-pointer hover:backdrop-blur-2xl rounded-sm hover:bg-[#262626] flex items-center px-2 py-2 gap-2 text-left ">
                <SignedIn>
                <GoSignOut></GoSignOut>
                  <SignOutButton redirectUrl="/sign-up">
                    <p>Sign Out</p>
                  </SignOutButton>
                </SignedIn>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
