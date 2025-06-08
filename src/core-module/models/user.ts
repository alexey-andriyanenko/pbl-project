export type UserModel = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
};

export type UserRole = "ADMIN" | "USER";
