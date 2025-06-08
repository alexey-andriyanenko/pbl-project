import { TaskStatus } from "../../models/task.ts";

export const PROJECT_BOARD_DETAILS_COLUMNS: TaskStatus[] = [
  "OPEN",
  "IN_PROGRESS",
  "SCHEDULED",
  "DONE",
  "RE_OPENED",
];

export const TaskStatusToLabel: Record<TaskStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  SCHEDULED: "Scheduled",
  DONE: "Done",
  RE_OPENED: "Reopened",
};
