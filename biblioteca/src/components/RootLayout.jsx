import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./sidebar/AppSidebar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 mx-auto px-6 py-4 overflow-y-auto">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default RootLayout;
