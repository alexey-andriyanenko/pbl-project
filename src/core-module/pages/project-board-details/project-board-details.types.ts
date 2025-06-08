import { TaskStatus } from "../../models/task.ts";

export type ProjectBoardColumn = {
  value: TaskStatus;
  label: string;
};
