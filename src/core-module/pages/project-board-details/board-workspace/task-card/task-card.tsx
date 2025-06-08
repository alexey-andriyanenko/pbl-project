import React from "react";
import { observer } from "mobx-react-lite";
import { TaskModel } from "../../../../models/task.ts";
import { pickColor } from "../../../../../shared-module/utils";
import { Avatar, Button, Card } from "@chakra-ui/react";
import { useProjectStore } from "src/core-module/store/index.ts";

type TaskCardProps = {
  task: TaskModel;
  onEdit: (task: TaskModel) => void;
  onDelete: (task: TaskModel) => void;
};

export const TaskCard: React.FC<TaskCardProps> = observer(({ task, onEdit, onDelete }) => {
  const projectStore = useProjectStore();
  const handleEdit = () => onEdit(task);
  const handleDelete = () => onDelete(task);

  const assigneeUser = React.useMemo(
    () => projectStore.users.find((user) => user.id === task.assigneeId),
    [projectStore.users, task.assigneeId],
  );

  return (
    <div>
      <Card.Root width="100%" maxHeight="350px">
        <Card.Body gap="2">
          <Avatar.Root size="lg" colorPalette={pickColor(assigneeUser?.fullName || "Assignee")}>
            <Avatar.Fallback name={assigneeUser?.fullName} />
          </Avatar.Root>
          <Card.Title mt="2">{task.title}</Card.Title>
          <Card.Description>{task.description}</Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button colorPalette="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
});
