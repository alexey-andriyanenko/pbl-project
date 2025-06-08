import { IRoute } from "src/routes";

import SignIn from "src/auth-module/pages/sign-in";
import SignUp from "src/auth-module/pages/sign-up";
import AdminHack from "src/auth-module/pages/admin-hack";

export const AuthRoutes = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  initAdmin: "/init-admin",
};

const routes: IRoute[] = [
  {
    path: AuthRoutes.signIn,
    element: <SignIn />,
  },
  {
    path: AuthRoutes.signUp,
    element: <SignUp />,
  },
  {
    path: AuthRoutes.initAdmin,
    element: <AdminHack />,
  },
];

const authModule = {
  routes,
};

export default authModule;
