import { UserModel } from "../models";

export interface ISignInRequest {
  username: string;
  password: string;
}

export interface ISignInResponse {
  id: number;
  token: string;
  role: "USER" | "ADMIN";
}

export type SignUpRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  orgId: number;
  role: "USER" | "ADMIN";
};

export type SignUpResponse = UserModel;
