import Organization from "src/core-module/pages/organization";
import OrganizationUsers from "src/core-module/pages/organization-users";
import OrganizationSettings from "src/core-module/pages/organization-settings";
import OrganizationProjects from "src/core-module/pages/organization-projects";
import Project from "src/core-module/pages/project";
import { IRoute } from "src/routes";

import { OrganizationRoutes, ProjectRoutes } from "./routes.ts";

export const CoreRoutes = {
  organization: OrganizationRoutes,
  project: ProjectRoutes,
};

const routes: IRoute[] = [
  {
    path: CoreRoutes.organization.home,
    element: <Organization />,
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.users,
    element: <OrganizationUsers />,
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.settings,
    element: <OrganizationSettings />,
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.projects,
    element: <OrganizationProjects />,
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.home,
    element: <Project />,
    isPrivate: true,
  },
];

const coreModule = {
  routes,
};

export default coreModule;
