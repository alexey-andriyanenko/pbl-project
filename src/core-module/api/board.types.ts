import { BoardModel } from "../models/board.ts";
import { TaskModel, TaskStatus } from "../models/task.ts";

export type GetBoardsRequest = {
  userId: number;
  organizationId: number;
  projectId: number;
};

export type GetBoardsResponse = BoardModel[];

export type GetBoardByIdRequest = {
  userId: number;
  organizationId: number;
  projectId: number;
  boardId: number;
};

export type GetBoardByIdResponse = BoardModel;

export type CreateBoardRequest = {
  name: string;
  description: string;
  projectId: number;
  organizationId: number;
  userId: number;
};

export type CreateBoardResponse = BoardModel;

export type UpdateBoardRequest = CreateBoardRequest & {
  id: number;
};

export type UpdateBoardResponse = BoardModel;

export type DeleteBoardRequest = {
  userId: number;
  organizationId: number;
  projectId: number;
  boardId: number;
};

export type GetTasksByBoardIdRequest = {
  organizationId: number;
  projectId: number;
  boardId: number;
  userId: number;
};

export type GetTasksByBoardIdResponse = TaskModel[];

export type CreateTaskRequest = {
  organizationId: number;
  projectId: number;
  boardId: number;
  userId: number;
  title: string;
  description: string;
  assigneeId: number;
  status: TaskStatus;
};

export type CreateTaskResponse = TaskModel;

export type UpdateTaskRequest = CreateTaskRequest & {
  id: number;
};

export type UpdateTaskResponse = TaskModel;

export type DeleteTaskRequest = {
  organizationId: number;
  projectId: number;
  boardId: number;
  userId: number;
  id: number;
};
