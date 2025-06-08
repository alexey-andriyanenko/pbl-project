export const OrganizationRoutes = {
  select: "/organization-selection",
  invalid: "/invalid-organization",
  home: "/organization/:organizationName",
  projects: "/organization/:organizationName/projects",
  users: "/organization/:organizationName/users",
  settings: "/organization/:organizationName/settings",
};

export const ProjectRoutes = {
  invalid: "/organization/:organizationName/invalid-project",
  home: "/organization/:organizationName/projects/:projectName",
  settings: "/organization/:organizationName/projects/:projectName/settings",
  boards: "/organization/:organizationName/projects/:projectName/boards",
  boardDetails: "/organization/:organizationName/projects/:projectName/boards/:boardId",
  team: "/organization/:organizationName/projects/:projectName/team",
};
