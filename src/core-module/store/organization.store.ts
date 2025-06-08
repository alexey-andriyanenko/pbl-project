import { makeAutoObservable, runInAction } from "mobx";
import { OrganizationModel } from "../models/organization.ts";
import { organizationApiService } from "../api/organization.api.ts";
import { UserModel } from "../models/user.ts";
import { userApiService } from "../api/user.api.ts";
import { CreateUserRequest, UpdateUserRequest } from "../api/users.types.ts";

class OrganizationStore {
  private _currentOrganization: OrganizationModel | null = null;

  private _organizations: OrganizationModel[] = [];
  private _users: UserModel[] = [];

  public get currentOrganization(): OrganizationModel | null {
    return this._currentOrganization;
  }

  public get organizations(): OrganizationModel[] {
    return this._organizations;
  }

  public get users(): UserModel[] {
    return this._users;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrentOrganization(organization: OrganizationModel): void {
    runInAction(() => {
      this._currentOrganization = organization;
    });
  }

  public async fetchOrganizations(): Promise<void> {
    const res = await organizationApiService.getOrganizations();

    runInAction(() => {
      this._organizations = res;
    });
  }

  public async createOrganization(data: { name: string; description: string }): Promise<void> {
    const res = await organizationApiService.createOrganization(data);

    runInAction(() => {
      this._organizations.push(res);
    });
  }

  public async fetchUsersByOrganization(): Promise<void> {
    const res = await userApiService.getUsersByOrganization(this._currentOrganization!.id);

    runInAction(() => {
      this._users = res;
    });
  }

  public async createUser(data: CreateUserRequest): Promise<void> {
    await userApiService.createUser(data);
    await this.fetchUsersByOrganization();
  }

  public async updateUser(data: UpdateUserRequest): Promise<void> {
    const res = await userApiService.updateUser(data, this._currentOrganization!.id);

    runInAction(() => {
      const index = this._users.findIndex((u) => u.id === res.id);

      if (index !== -1) {
        this._users[index] = res;
      }
    });
  }

  public async deleteUser(userId: number): Promise<void> {
    await userApiService.deleteUser(userId, this._currentOrganization!.id);

    runInAction(() => {
      this._users = this._users.filter((u) => u.id !== userId);
    });
  }
}

export const organizationStore = new OrganizationStore();
