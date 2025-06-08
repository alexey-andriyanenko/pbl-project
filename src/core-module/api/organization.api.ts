import { httpClient } from "src/shared-module/api";
import {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetOrganizationsResponse,
} from "./organization.types.ts";

class OrganizationApiService {
  getOrganizations() {
    return httpClient.get<GetOrganizationsResponse>("/api/core/organizations").send();
  }

  createOrganization(data: CreateOrganizationRequest) {
    return httpClient
      .post<CreateOrganizationRequest, CreateOrganizationResponse>("/api/core/organizations")
      .send(data);
  }
}

export const organizationApiService = new OrganizationApiService();
