import { httpClient, authHttpClient } from "../../shared-module/api";
import {
  AssignUserToProjectRequest,
  CreateUserRequest,
  CreateUserResponse,
  GetUsersByOrganizationResponse,
  GetUsersByProjectResponse,
  UpdateUserRequest,
} from "./users.types.ts";

class UserApiService {
  getUsersByOrganization(organizationId: number) {
    return httpClient
      .get<GetUsersByOrganizationResponse>("/api/core/organizations/:organizationId/users")
      .setRouteParams({ organizationId })
      .send();
  }

  getUsersByProject(organizationId: number, projectId: number) {
    return httpClient
      .get<GetUsersByProjectResponse>(
        "/api/core/organizations/:organizationId/project-users/projects/:projectId",
      )
      .setRouteParams({ organizationId, projectId })
      .send();
  }

  createUser(data: CreateUserRequest) {
    return authHttpClient.post<CreateUserRequest, CreateUserResponse>("/auth/register").send(data);
  }

  updateUser(data: UpdateUserRequest, organizationId: number) {
    return httpClient
      .put<
        UpdateUserRequest,
        CreateUserResponse
      >("/api/core/organizations/:organizationId/users/:userId")
      .setRouteParams({ organizationId, userId: data.id })
      .send(data);
  }

  deleteUser(userId: number, organizationId: number) {
    return httpClient
      .delete<void>("/api/core/organizations/:organizationId/users/:userId")
      .setRouteParams({ organizationId, userId })
      .send();
  }

  assignUserToProject(data: AssignUserToProjectRequest) {
    return httpClient
      .post<AssignUserToProjectRequest, never>(
        "/api/core/organizations/:organizationId/project-users/projects/:projectId/users/:userId",
      )
      .setRouteParams({
        organizationId: data.organizationId,
        projectId: data.projectId,
        userId: data.userId,
      })
      .setSearchParams({
        role: data.role,
      })
      .send();
  }

  unassignUserFromProject({ organizationId, projectId, userId }: AssignUserToProjectRequest) {
    return httpClient
      .delete<never>(
        "/api/core/organizations/:organizationId/project-users/projects/:projectId/users/:userId",
      )
      .setRouteParams({ organizationId, projectId, userId })
      .send();
  }
}

export const userApiService = new UserApiService();
