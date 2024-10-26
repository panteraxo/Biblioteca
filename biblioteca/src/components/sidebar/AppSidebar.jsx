import { Home, LibraryBig, Settings, UserRoundCog } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import React from "react";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Home">
                <SidebarMenuButton asChild>
                  <a href="/dashboard">
                    <Home />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="Prestamos">
                <SidebarMenuButton asChild>
                  <a href="/prestamos">
                    <LibraryBig />
                    <span>Prestamos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem key="Mantenimiento">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Settings />
                      <span>Mantenimiento</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu>
                      <SidebarMenuSub key="Library">
                        <SidebarMenuSubItem>
                          <a href="/mantenimiento/library">Libros</a>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenu>
                    <SidebarMenu>
                      <SidebarMenuSub key="Category">
                        <SidebarMenuSubItem>
                          <a href="/mantenimiento/category">Categoria</a>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenu>
                    <SidebarMenu>
                      <SidebarMenuSub key="Autor">
                        <SidebarMenuSubItem>
                          <a href="/mantenimiento/autor">Autor</a>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenu>
                    <SidebarMenu>
                      <SidebarMenuSub key="Editorial">
                        <SidebarMenuSubItem>
                          <a href="/mantenimiento/editorial">Editorial</a>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem key="Usuarios">
                <SidebarMenuButton asChild>
                  <a href="/usuarios/estudiante">
                    <UserRoundCog />
                    <span>Usuarios</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
