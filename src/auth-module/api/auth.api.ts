import { authHttpClient, HttpClient } from "src/shared-module/api";

import { ISignInRequest, ISignInResponse } from "./auth.types";
import { UserModel } from "../models";

class AuthApiService {
  login(data: ISignInRequest) {
    return authHttpClient.post<ISignInRequest, ISignInResponse>("/auth/login").send(data);
  }

  getMe() {
    if (!HttpClient.token) {
      throw new Error("Token is not set");
    }

    return authHttpClient
      .get<UserModel>("/auth/get-me")
      .send(undefined, { Authorization: HttpClient.token! });
  }

  initAdmin() {
    return authHttpClient.get("/auth/init-admin").send();
  }
}

export const authApiService = new AuthApiService();
