import React from "react";
import { observer } from "mobx-react-lite";
import { Flex } from "@chakra-ui/react";
import { PROJECT_BOARD_DETAILS_COLUMNS } from "../project-board-details.constants.ts";
import { BoardColumn } from "./board-column";
import { useBoardStore, useModalsStore, useProjectStore } from "../../../store";
import { TaskModel, TaskStatus } from "../../../models/task.ts";
import { useAuthStore } from "../../../../auth-module/store";
import { useModalsStore as useSharedModalsStore } from "src/shared-module/store/modals";

export const BoardWorkspace: React.FC = observer(() => {
  const authStore = useAuthStore();
  const projectStore = useProjectStore();
  const boardStore = useBoardStore();
  const modalsStore = useModalsStore();
  const sharedModalsStore = useSharedModalsStore();

  const handleCreateTask = (status: TaskStatus) => {
    modalsStore.open("CreateOrEditTaskDialog", {
      status,
      users: projectStore.users,
      onCreate: (values) =>
        boardStore.createTask({
          ...values,
          boardId: boardStore.currentBoard!.id,
          organizationId: boardStore.currentBoard!.organizationId,
          projectId: boardStore.currentBoard!.projectId,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  const handleEditTask = (task: TaskModel) => {
    modalsStore.open("CreateOrEditTaskDialog", {
      task: task,
      users: projectStore.users,
      onEdit: (values) =>
        boardStore.updateTask({
          ...values,
          id: task.id,
          boardId: boardStore.currentBoard!.id,
          organizationId: boardStore.currentBoard!.organizationId,
          projectId: boardStore.currentBoard!.projectId,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  const handleDeleteTask = (task: TaskModel) => {
    sharedModalsStore.open("ConfirmModal", {
      title: "Delete Task",
      description: `Are you sure you want to delete the task "${task.title}"?`,
      onConfirm: () =>
        boardStore.deleteTask({
          id: task.id,
          boardId: boardStore.currentBoard!.id,
          organizationId: boardStore.currentBoard!.organizationId,
          projectId: boardStore.currentBoard!.projectId,
          userId: authStore.currentUser!.id,
        }),
    });
  };

  return (
    <Flex flex="1" width="100%" gap={4} overflowX="auto">
      {PROJECT_BOARD_DETAILS_COLUMNS.map((x) => (
        <BoardColumn
          key={x}
          status={x}
          tasks={boardStore.getTasksByStatus(x)}
          onCreateTask={handleCreateTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      ))}
    </Flex>
  );
});
