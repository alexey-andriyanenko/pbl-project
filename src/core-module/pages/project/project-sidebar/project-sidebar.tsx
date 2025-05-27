import React from "react";

import { AppSidebar } from "src/shared-module/layout";
import { PROJECT_NAV_ITEMS } from "./project-sidebar.constants.ts";

export const ProjectSidebar: React.FC = () => {
  return <AppSidebar navItems={PROJECT_NAV_ITEMS} />;
};
