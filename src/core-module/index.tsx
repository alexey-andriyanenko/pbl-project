import OrganizationSelection from "./pages/organization-selection";
import InvalidOrganization from "./pages/invalid-organization";
import Organization from "src/core-module/pages/organization";
import OrganizationUsers from "src/core-module/pages/organization-users";
import OrganizationSettings from "src/core-module/pages/organization-settings";
import OrganizationProjects from "src/core-module/pages/organization-projects";
import InvalidProject from "src/core-module/pages/invalid-project";
import Project from "src/core-module/pages/project";
import ProjectUsers from "src/core-module/pages/project-users";
import ProjectBoards from "./pages/project-boards";
import ProjectBoardDetails from "./pages/project-board-details";
import { IRoute } from "src/routes";
import { Providers } from "src/core-module/providers";

import { OrganizationRoutes, ProjectRoutes } from "./routes.ts";
import { OrganizationRoute } from "./organization-route.tsx";
import { ProjectRoute } from "./project-route.tsx";

export const CoreRoutes = {
  organization: OrganizationRoutes,
  project: ProjectRoutes,
};

const routes: IRoute[] = [
  {
    path: CoreRoutes.organization.select,
    element: (
      <Providers>
        <OrganizationSelection />
      </Providers>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.invalid,
    element: <InvalidOrganization />,
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.home,
    element: (
      <OrganizationRoute>
        <Providers>
          <Organization />
        </Providers>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.users,
    element: (
      <OrganizationRoute>
        <Providers>
          <OrganizationUsers />
        </Providers>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.settings,
    element: (
      <OrganizationRoute>
        <Providers>
          <OrganizationSettings />
        </Providers>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.organization.projects,
    element: (
      <OrganizationRoute>
        <Providers>
          <OrganizationProjects />
        </Providers>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.invalid,
    element: (
      <OrganizationRoute>
        <Providers>
          <InvalidProject />
        </Providers>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.home,
    element: (
      <OrganizationRoute>
        <ProjectRoute>
          <Providers>
            <Project />
          </Providers>
        </ProjectRoute>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.team,
    element: (
      <OrganizationRoute>
        <ProjectRoute>
          <Providers>
            <ProjectUsers />
          </Providers>
        </ProjectRoute>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.boards,
    element: (
      <OrganizationRoute>
        <ProjectRoute>
          <Providers>
            <ProjectBoards />
          </Providers>
        </ProjectRoute>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
  {
    path: CoreRoutes.project.boardDetails,
    element: (
      <OrganizationRoute>
        <ProjectRoute>
          <Providers>
            <ProjectBoardDetails />
          </Providers>
        </ProjectRoute>
      </OrganizationRoute>
    ),
    isPrivate: true,
  },
];

const coreModule = {
  routes,
};

export default coreModule;
