import React from "react";
import { Navigate } from "react-router";
import { observer } from "mobx-react-lite";

import { AuthRoutes } from "src/auth-module";
import { useAuthStore } from "src/auth-module/store";

import { PrivateLayout } from "./private-layout";

export interface IPrivateRouteProps {
  children: React.ReactNode;
}
export const PrivateRoute: React.FC<IPrivateRouteProps> = observer(({ children }) => {
  const authStore = useAuthStore();

  if (!authStore.isLogged) return <Navigate to={AuthRoutes.signIn} />;
  return <PrivateLayout>{children}</PrivateLayout>;
});
