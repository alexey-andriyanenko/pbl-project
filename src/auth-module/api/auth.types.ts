export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  projectName: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}
