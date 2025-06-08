import React from "react";
import { observer } from "mobx-react-lite";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthStore } from "../../../auth-module/store";
import { useBoardStore, useOrganizationStore, useProjectStore } from "../../store";
import { ProjectSidebar } from "../project/project-sidebar";
import { BoardWorkspace } from "./board-workspace";
import { boardStore } from "../../store/board.store.ts";

const ProjectBoardDetails: React.FC = observer(() => {
  const params = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const organizationStore = useOrganizationStore();
  const projectStore = useProjectStore();
  const boardsStore = useBoardStore();
  const authStore = useAuthStore();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!params.boardId) {
      navigate(
        `/organizations/${organizationStore.currentOrganization!.name}/projects/${projectStore.currentProject!.name}/boards`,
      );
    }

    if (
      boardsStore.currentBoard === null ||
      (boardsStore.currentBoard && boardsStore.currentBoard.id !== +params.boardId!)
    ) {
      setLoading(true);

      boardsStore
        .fetchBoardById({
          organizationId: organizationStore.currentOrganization!.id,
          projectId: projectStore.currentProject!.id,
          userId: authStore.currentUser!.id,
          boardId: +params.boardId!,
        })
        .then(() =>
          boardsStore.fetchTasksByBoardId({
            boardId: boardStore.currentBoard!.id,
            organizationId: organizationStore.currentOrganization!.id,
            projectId: projectStore.currentProject!.id,
            userId: authStore.currentUser!.id,
          }),
        )
        .then(() => projectStore.fetchUsersByProject(organizationStore.currentOrganization!.id))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch board:", error);
        });
    }
  }, []);

  return (
    <Flex flex="1" direction="row">
      <ProjectSidebar />

      <Flex direction="column" width="calc(100vw - 320px)" overflow="hidden" p={4}>
        {loading ? (
          <div>Loading workspace...</div>
        ) : (
          <>
            <BoardWorkspace />
          </>
        )}
      </Flex>
    </Flex>
  );
});

export default ProjectBoardDetails;
