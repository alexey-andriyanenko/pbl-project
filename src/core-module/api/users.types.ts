import { UserModel, UserRole } from "src/core-module/models/user.ts";

export type GetUsersByOrganizationResponse = UserModel[];

export type GetUsersByProjectResponse = UserModel[];

export type CreateUserRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  orgId: number;
  role: UserRole;
};

export type CreateUserResponse = {
  id: number;
  email: string;
  role: UserRole;
  token: string;
};

export type UpdateUserRequest = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
};

export type UpdateUserResponse = UserModel;

export type AssignUserToProjectRequest = {
  userId: number;
  projectId: number;
  organizationId: number;
  role: UserRole;
};

export type UnassignUserFromProjectRequest = {
  userId: number;
  projectId: number;
  organizationId: number;
};
