import { makeAutoObservable, runInAction } from "mobx";
import { ProjectModel } from "../models/project.ts";
import { projectApiService } from "../api/project.api.ts";
import { CreateProjectRequest, UpdateProjectRequest } from "../api/project.types.ts";
import { UserModel } from "../models/user.ts";
import { userApiService } from "../api/user.api.ts";

class ProjectStore {
  private _currentProject: ProjectModel | null = null;

  private _projects: ProjectModel[] = [];

  private _users: UserModel[] = [];

  public get currentProject(): ProjectModel | null {
    return this._currentProject;
  }

  public get projects(): ProjectModel[] {
    return this._projects;
  }

  public get users(): UserModel[] {
    return this._users;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentProject(project: ProjectModel): void {
    this._currentProject = project;
  }

  public async fetchProjects(organizationId: number): Promise<void> {
    const res = await projectApiService.getProjects(organizationId);

    runInAction(() => {
      this._projects = res;
    });
  }

  public async createProject(data: CreateProjectRequest): Promise<void> {
    const res = await projectApiService.createProject(data);

    runInAction(() => {
      this._projects.push(res);
    });
  }

  public async updateProject(data: UpdateProjectRequest): Promise<void> {
    const res = await projectApiService.updateProject(data);

    runInAction(() => {
      const index = this._projects.findIndex((p) => p.id === res.id);

      console.log(index);

      if (index !== -1) {
        this._projects[index] = res;
        console.log(index);

        if (this._currentProject?.id === res.id) {
          this._currentProject = res;
        }
      }
    });
  }

  public async deleteProject(organizationId: number, projectId: number): Promise<void> {
    await projectApiService.deleteProject(organizationId, projectId);

    runInAction(() => {
      this._projects = this._projects.filter((p) => p.id !== projectId);
      if (this._currentProject?.id === projectId) {
        this._currentProject = null;
      }
    });
  }

  public async fetchUsersByProject(organizationId: number): Promise<void> {
    const res = await userApiService.getUsersByProject(organizationId, this._currentProject!.id);

    runInAction(() => {
      this._users = res;
    });
  }

  public async assignUserToProject(organizationId: number, userId: number): Promise<void> {
    await userApiService.assignUserToProject({
      userId,
      organizationId,
      projectId: this._currentProject!.id,
      role: "USER",
    });

    await this.fetchUsersByProject(organizationId);
  }

  public async unassignUserFromProject(organizationId: number, userId: number): Promise<void> {
    await userApiService.unassignUserFromProject({
      userId,
      organizationId,
      projectId: this._currentProject!.id,
      role: "USER",
    });

    runInAction(() => {
      this._users = this._users.filter((u) => u.id !== userId);
    });
  }
}

export const projectStore = new ProjectStore();
