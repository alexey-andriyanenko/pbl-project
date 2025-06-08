import React from "react";
import { observer } from "mobx-react-lite";

import { AppSidebar, AppSidebarNavItemProps } from "src/shared-module/layout";
import { useOrganizationStore } from "src/core-module/store";
import { getNavItems } from "./organization-sidebar.utils.ts";

export const OrganizationSidebar: React.FC = observer(() => {
  const organizationStore = useOrganizationStore();
  const [navItems, setNavItems] = React.useState<AppSidebarNavItemProps[]>([]);

  React.useEffect(() => {
    if (organizationStore.currentOrganization !== null) {
      setNavItems(getNavItems(organizationStore.currentOrganization!.name));
    }
  }, [organizationStore.currentOrganization]);

  return <AppSidebar title={organizationStore.currentOrganization!.name} navItems={navItems} />;
});
