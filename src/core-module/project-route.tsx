import React from "react";
import { observer } from "mobx-react-lite";
import { useOrganizationStore, useProjectStore } from "./store";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectRoute: React.FC<React.PropsWithChildren> = observer(({ children }) => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const organizationStore = useOrganizationStore();
  const projectStore = useProjectStore();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (projectStore.currentProject !== null && projectStore.projects.length > 0) {
      return;
    }

    if (projectStore.projects.length === 0) {
      setLoading(true);

      projectStore
        .fetchProjects(organizationStore.currentOrganization!.id)
        .then(() => {
          setLoading(false);

          if (projectStore.currentProject === null) {
            const proj = projectStore.projects.find((p) => p.name === projectName);

            if (proj) {
              projectStore.setCurrentProject(proj);
            } else {
              navigate(
                `/organization/${organizationStore.currentOrganization!.name}/invalid-project`,
              );
            }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch projects:", error);
          setLoading(false);
        });
    }
  }, [organizationStore.currentOrganization, projectStore.currentProject, projectStore.projects]);

  return loading || projectStore.currentProject === null ? (
    <div>Loading projects...</div>
  ) : (
    children
  );
});
