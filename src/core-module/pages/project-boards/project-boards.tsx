import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ProjectSidebar } from "../project/project-sidebar";
import { useBoardStore, useModalsStore, useOrganizationStore, useProjectStore } from "../../store";
import { useModalsStore as useSharedModalsStore } from "src/shared-module/store/modals";
import { BoardsList } from "./boards-list";
import { BoardModel } from "../../models/board.ts";
import { useAuthStore } from "../../../auth-module/store";

const ProjectBoards: React.FC = observer(() => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const organizationStore = useOrganizationStore();
  const projectStore = useProjectStore();
  const boardsStore = useBoardStore();
  const modalsStore = useModalsStore();
  const sharedModalsStore = useSharedModalsStore();

  React.useEffect(() => {
    boardsStore
      .fetchBoards({
        organizationId: organizationStore.currentOrganization!.id,
        projectId: projectStore.currentProject!.id,
        userId: authStore.currentUser!.id,
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Failed to fetch boards:", error);
        setLoading(false);
      });
  }, [organizationStore.currentOrganization, projectStore.currentProject]);

  const handleVisit = (board: BoardModel) => {
    navigate(
      `/organization/${organizationStore.currentOrganization!.name}/projects/${projectStore.currentProject!.name}/boards/${board.id}`,
    );
  };

  const handleEdit = (board: BoardModel) => {
    modalsStore.open("CreateOrEditBoardDialog", {
      board,
      onEdit: (values) =>
        boardsStore.updateBoard({
          id: board.id,
          name: values.name,
          description: values.description,
          organizationId: organizationStore.currentOrganization!.id,
          projectId: projectStore.currentProject!.id,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  const handleCreate = () => {
    modalsStore.open("CreateOrEditBoardDialog", {
      onCreate: (values) =>
        boardsStore.createBoard({
          name: values.name,
          description: values.description,
          organizationId: organizationStore.currentOrganization!.id,
          projectId: projectStore.currentProject!.id,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  const handleDelete = (board: BoardModel) => {
    sharedModalsStore.open("ConfirmModal", {
      title: "Delete Board",
      description: `Are you sure you want to delete the board "${board.name}"?`,
      onConfirm: () =>
        boardsStore.deleteBoard({
          boardId: board.id,
          organizationId: organizationStore.currentOrganization!.id,
          projectId: projectStore.currentProject!.id,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  return (
    <Flex flex="1" direction="row" width="100%">
      <ProjectSidebar />

      <Flex direction="column" width="100%" p={4}>
        {loading ? (
          <div>loading users...</div>
        ) : (
          <>
            <Flex justify="flex-end">
              <Button variant="outline" onClick={handleCreate}>
                Create Board
              </Button>
            </Flex>

            <BoardsList
              boards={boardsStore.boards}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onVisit={handleVisit}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
});

export default ProjectBoards;
