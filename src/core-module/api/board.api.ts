import { httpClient } from "../../shared-module/api";
import {
  CreateBoardRequest,
  CreateBoardResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteBoardRequest,
  DeleteTaskRequest,
  GetBoardByIdRequest,
  GetBoardByIdResponse,
  GetBoardsRequest,
  GetBoardsResponse,
  GetTasksByBoardIdRequest,
  GetTasksByBoardIdResponse,
  UpdateBoardRequest,
  UpdateBoardResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./board.types.ts";

class BoardApiService {
  public async getBoards(data: GetBoardsRequest) {
    return await httpClient
      .get<GetBoardsResponse>("/api/orgs/:organizationId/projects/:projectId/boards")
      .setRouteParams({ organizationId: data.organizationId, projectId: data.projectId })
      .send(undefined, { "X-User-Id": data.userId.toString() });
  }

  public async getBoardById(data: GetBoardByIdRequest) {
    return await httpClient
      .get<GetBoardByIdResponse>("/api/orgs/:organizationId/projects/:projectId/boards/:boardId")
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
      })
      .send(undefined, { "X-User-Id": data.userId.toString() });
  }

  public async createBoard(data: CreateBoardRequest) {
    return await httpClient
      .post<
        CreateBoardRequest,
        CreateBoardResponse
      >("/api/orgs/:organizationId/projects/:projectId/boards")
      .setRouteParams({ organizationId: data.organizationId, projectId: data.projectId })
      .send(data, { "X-User-Id": data.userId.toString() });
  }

  public async updateBoard(data: UpdateBoardRequest) {
    return await httpClient
      .put<UpdateBoardRequest, UpdateBoardResponse>(
        "/api/orgs/:organizationId/projects/:projectId/boards/:boardId",
      )
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.id,
      })
      .send(data, { "X-User-Id": data.userId.toString() });
  }

  public async deleteBoard(data: DeleteBoardRequest) {
    return await httpClient
      .delete<void>("/api/orgs/:organizationId/projects/:projectId/boards/:boardId")
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
      })
      .send(undefined, { "X-User-Id": data.userId.toString() });
  }

  public async getTasksByBoardId(data: GetTasksByBoardIdRequest) {
    return await httpClient
      .get<GetTasksByBoardIdResponse>(
        "/api/orgs/:organizationId/projects/:projectId/boards/:boardId/tasks",
      )
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
      })
      .send(undefined, { "X-User-Id": data.userId.toString() });
  }

  public async createTask(data: CreateTaskRequest) {
    return await httpClient
      .post<CreateTaskRequest, CreateTaskResponse>(
        "/api/orgs/:organizationId/projects/:projectId/boards/:boardId/tasks",
      )
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
      })
      .send(data, { "X-User-Id": data.userId.toString() });
  }

  public async updateTask(data: UpdateTaskRequest) {
    return await httpClient
      .put<UpdateTaskRequest, UpdateTaskResponse>(
        "/api/orgs/:organizationId/projects/:projectId/boards/:boardId/tasks/:taskId",
      )
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
        taskId: data.id,
      })
      .send(data, { "X-User-Id": data.userId.toString() });
  }

  public async deleteTask(data: DeleteTaskRequest) {
    return await httpClient
      .delete<void>("/api/orgs/:organizationId/projects/:projectId/boards/:boardId/tasks/:taskId")
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        boardId: data.boardId,
        taskId: data.id,
      })
      .send(undefined, { "X-User-Id": data.userId.toString() });
  }
}

export const boardApiService = new BoardApiService();
