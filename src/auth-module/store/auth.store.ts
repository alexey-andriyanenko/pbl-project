import { makeAutoObservable, runInAction } from "mobx";

import { ILoginRequest } from "../api";
import { UserModel } from "../models";

class AuthStore {
  private _isLogged: boolean | null = null;

  private _user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public get isLogged() {
    return this._isLogged;
  }

  public get User(): UserModel | null {
    return this._user;
  }

  async signIn(data: ILoginRequest): Promise<void> {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    if (data.email === "admin@example.com" && data.password === "root") {
      runInAction(() => {
        this._isLogged = true;
        this._user = {
          id: 1,
          firstName: "Admin",
          lastName: "User",
          email: "admin@example.com",
        };
      });
    } else {
      throw new Error("Invalid email or password");
    }
  }
}

export const authStore = new AuthStore();
