import { OrganizationRoutes } from "src/core-module/routes.ts";
import { AppSidebarNavItemProps } from "src/shared-module/layout";

export const ORGANIZATION_NAV_ITEMS: AppSidebarNavItemProps[] = [
  {
    href: OrganizationRoutes.home,
    name: "Home",
  },
  {
    href: OrganizationRoutes.projects,
    name: "Organization Projects",
  },
  {
    href: OrganizationRoutes.users,
    name: "Organization Users",
  },
  {
    href: OrganizationRoutes.settings,
    name: "Organization Settings",
  },
];
