import { httpClient } from "../../shared-module/api";
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectsResponse,
} from "./project.types.ts";

class ProjectApiService {
  public async getProjects(organizationId: number) {
    return await httpClient
      .get<GetProjectsResponse>("/api/core/organizations/:organizationId/projects")
      .setRouteParams({ organizationId })
      .send();
  }

  public async createProject(data: CreateProjectRequest) {
    return await httpClient
      .post<
        CreateProjectRequest,
        CreateProjectResponse
      >("/api/core/organizations/:organizationId/projects")
      .setRouteParams({ organizationId: data.organizationId })
      .send(data);
  }

  public async updateProject(data: CreateProjectRequest & { projectId: number }) {
    return await httpClient
      .put<
        CreateProjectRequest & { projectId: number },
        CreateProjectResponse
      >("/api/core/organizations/:organizationId/projects/:projectId")
      .setRouteParams({ organizationId: data.organizationId, projectId: data.projectId })
      .send(data);
  }

  public async deleteProject(organizationId: number, projectId: number) {
    return await httpClient
      .delete<void>("/api/core/organizations/:organizationId/projects/:projectId")
      .setRouteParams({ organizationId, projectId })
      .send();
  }
}

export const projectApiService = new ProjectApiService();
