import { makeAutoObservable, runInAction } from "mobx";
import { BoardModel } from "../models/board.ts";
import {
  CreateBoardRequest,
  CreateTaskRequest,
  DeleteBoardRequest,
  DeleteTaskRequest,
  GetBoardByIdRequest,
  GetBoardsRequest,
  GetTasksByBoardIdRequest,
  UpdateTaskRequest,
} from "../api/board.types.ts";
import { boardApiService } from "../api/board.api.ts";
import { TaskModel, TaskStatus } from "../models/task.ts";

class BoardStore {
  private _boards: BoardModel[] = [];

  private _currentBoard: BoardModel | null = null;

  private _tasks: TaskModel[] = [];

  public get boards(): BoardModel[] {
    return this._boards;
  }

  public get currentBoard(): BoardModel | null {
    return this._currentBoard;
  }

  public get tasks(): TaskModel[] {
    return this._tasks;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentBoard(board: BoardModel | null): void {
    this._currentBoard = board;
  }

  public getTasksByStatus(status: TaskStatus): TaskModel[] {
    return this._tasks.filter((task) => task.status === status);
  }

  public async fetchBoards(data: GetBoardsRequest): Promise<void> {
    const res = await boardApiService.getBoards(data);

    runInAction(() => {
      this._boards = res;
    });
  }

  public async fetchBoardById(data: GetBoardByIdRequest): Promise<void> {
    const res = await boardApiService.getBoardById(data);

    runInAction(() => {
      this._currentBoard = res;
    });
  }

  public async createBoard(data: CreateBoardRequest) {
    const res = await boardApiService.createBoard(data);

    runInAction(() => {
      this._boards.push(res);
    });
  }

  public async updateBoard(data: CreateBoardRequest & { id: number }) {
    const res = await boardApiService.updateBoard(data);

    runInAction(() => {
      const index = this._boards.findIndex((board) => board.id === res.id);
      if (index !== -1) {
        this._boards[index] = res;
      }
    });
  }

  public async deleteBoard(data: DeleteBoardRequest): Promise<void> {
    await boardApiService.deleteBoard(data);

    runInAction(() => {
      this._boards = this._boards.filter((board) => board.id !== data.boardId);
    });
  }

  public async fetchTasksByBoardId(data: GetTasksByBoardIdRequest): Promise<void> {
    const res = await boardApiService.getTasksByBoardId(data);

    runInAction(() => {
      this._tasks = res;
    });
  }

  public async createTask(data: CreateTaskRequest): Promise<void> {
    const res = await boardApiService.createTask(data);

    runInAction(() => {
      this._tasks.push(res);
    });
  }

  public async updateTask(data: UpdateTaskRequest): Promise<void> {
    const res = await boardApiService.updateTask(data);

    runInAction(() => {
      const index = this._tasks.findIndex((task) => task.id === res.id);
      if (index !== -1) {
        this._tasks[index] = res;
      }
    });
  }

  public async deleteTask(data: DeleteTaskRequest): Promise<void> {
    await boardApiService.deleteTask(data);

    runInAction(() => {
      this._tasks = this._tasks.filter((task) => task.id !== data.id);
    });
  }
}

export const boardStore = new BoardStore();
