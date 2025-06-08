import { makeAutoObservable, runInAction } from "mobx";

import { authApiService, ISignInRequest } from "../api";
import { UserModel } from "../models";
import { HttpClient } from "../../shared-module/api";

class AuthStore {
  private _isLogged: boolean | null = localStorage.getItem("token") !== null;
  private _userId: number | null = null;

  private _currentUser: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isLogged() {
    return this._isLogged;
  }

  public get currentUser(): UserModel | null {
    return this._currentUser;
  }

  public get userId(): number | null {
    return this._userId;
  }

  async signIn(data: ISignInRequest): Promise<void> {
    const res = await authApiService.login(data);
    localStorage.setItem("token", res.token);

    runInAction(() => {
      this._isLogged = true;
      HttpClient.token = res.token;
    });
  }

  async fetchMe() {
    if (!this._isLogged) {
      throw new Error("User is not logged in");
    }

    const res = await authApiService.getMe();

    runInAction(() => {
      this._currentUser = res;
    });
  }
}

export const authStore = new AuthStore();
