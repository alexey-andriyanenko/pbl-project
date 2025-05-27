import { AppSidebarNavItemProps } from "src/shared-module/layout";
import { ProjectRoutes } from "src/core-module/routes.ts";

export const PROJECT_NAV_ITEMS: AppSidebarNavItemProps[] = [
  {
    href: ProjectRoutes.home,
    name: "Project Home",
  },
  {
    href: ProjectRoutes.workspace,
    name: "Project Workspace",
  },
  {
    href: ProjectRoutes.team,
    name: "Project Team",
  },
  {
    href: ProjectRoutes.settings,
    name: "Project Settings",
  },
];
