import React from "react";
import { observer } from "mobx-react-lite";
import { Stack, Heading, Button } from "@chakra-ui/react";

import { TaskModel, TaskStatus } from "../../../../models/task.ts";
import { TaskStatusToLabel } from "../../project-board-details.constants.ts";
import { TaskCard } from "../task-card";

type BoardColumnProps = {
  status: TaskStatus;
  tasks: TaskModel[];
  onCreateTask: (status: TaskStatus) => void;
  onEditTask: (task: TaskModel) => void;
  onDeleteTask: (task: TaskModel) => void;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const BoardColumn: React.FC<BoardColumnProps> = observer(
  ({ status, tasks, onCreateTask, onEditTask, onDeleteTask }) => {
    const id = React.useMemo(() => `board-column-${status}-${generateId()}`, [status]);
    const { setNodeRef } = useDroppable({
      id,
    });
    const handleCreateTask = () => onCreateTask?.(status);

    return (
      <Stack
        ref={setNodeRef}
        id={id}
        width="300px"
        minWidth="300px"
        height="100%"
        padding={4}
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Heading>{TaskStatusToLabel[status]}</Heading>

          {status === "OPEN" ? <Button onClick={handleCreateTask}>Add Task</Button> : null}
        </Stack>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
        ))}
      </Stack>
    );
  },
);
