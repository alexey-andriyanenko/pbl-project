import { httpClient } from "src/shared-module/api";

import { ILoginRequest } from "./auth.types";

class AuthApiService {
  login(data: ILoginRequest) {
    return httpClient.post<ILoginRequest, void>("/auth/login").send(data);
  }
}

export const authApiService = new AuthApiService();
