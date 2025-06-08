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
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (authStore.isLogged && authStore.currentUser !== null) {
      return;
    }

    if (authStore.currentUser === null) {
      setLoading(true);
      authStore
        .fetchMe()
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setLoading(false);
        });
    }
  }, [authStore.isLogged, authStore.currentUser]);

  if (!authStore.isLogged) return <Navigate to={AuthRoutes.signIn} />;

  return loading || authStore.currentUser === null ? (
    <div>Loading user...</div>
  ) : (
    <PrivateLayout>{children}</PrivateLayout>
  );
});
