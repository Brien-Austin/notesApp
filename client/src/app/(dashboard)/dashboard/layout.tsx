"use client";
import Sidebar from "@/app/features/dashboard/components/common/sidebar";
import { SidebarProvider } from "@/app/features/dashboard/contexts/sidebarContext";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3 md:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
