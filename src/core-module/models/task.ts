export type TaskStatus = "OPEN" | "IN_PROGRESS" | "SCHEDULED" | "DONE" | "RE_OPENED";

export type TaskModel = {
  id: number;
  title: string;
  description: string;
  assigneeId: number;
  createdByUserId: number;
  boardId: number;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
};
