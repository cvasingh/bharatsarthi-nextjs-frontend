import { Bell, Heart, Search, Settings, Star, User2 } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "User info",
    url: "#",
    icon: User2,
  },
  {
    title: "Favorites",
    url: "#",
    icon: Heart,
  },
  {
    title: "Watchlist",
    url: "#",
    icon: Star,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Notifications",
    url: "#",
    icon: Bell,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="px-6">
        <SidebarGroup>
          <SidebarGroupLabel className={"text-base my-6 font-semibold"}>
            User Profile
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 text-gray-400 text-sm font-medium">
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
