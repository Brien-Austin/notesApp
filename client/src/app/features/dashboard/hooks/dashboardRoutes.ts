import {
  LucideIcon,
  Home,
  User,
  Settings,
  Tag,
  Globe,
  Sparkles,
  BadgeCheck,
  Blocks,
  BarChart2,
  FileText,
  Bookmark,
  Star,
  Tags,
} from "lucide-react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
interface DashboardRoute {
  route: string;
  routeName: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function useDashboardRoutes(): DashboardRoute[] {
  const pathname = usePathname();

  return useMemo(
    () => [
      {
        route: "/dashboard",
        routeName: "Home",
        icon: Home,
        isActive: pathname === "/home",
      },
      {
        route: "/dashboard/notes",
        routeName: "Notes",
        icon: FileText,
        isActive: pathname === "/dashboard/notes",
      },
      {
        route: "/dashboard/bookmarks",
        routeName: "Bookmarks",
        icon: Bookmark,
        isActive: pathname === "/dashboard/bookmarks",
      },
      {
        route: "/dashboard/favourites",
        routeName: "Favourites",
        icon: Star,
        isActive: pathname === "/dashboard/favourites",
      },
    ],
    [pathname]
  );
}
