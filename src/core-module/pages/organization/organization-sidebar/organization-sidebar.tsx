import React from "react";

import { AppSidebar } from "src/shared-module/layout";

import { ORGANIZATION_NAV_ITEMS } from "./organization-sidebar.constants.ts";

export const OrganizationSidebar: React.FC = () => {
  return <AppSidebar navItems={ORGANIZATION_NAV_ITEMS} />;
};
