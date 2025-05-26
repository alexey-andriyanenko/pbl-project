import { IRoute } from "src/routes";

import SignIn from "src/auth-module/pages/sign-in";
import SignUp from "src/auth-module/pages/sign-up";

export const AuthRoutes = {
  signIn: "/sign-in",
  signUp: "/sign-up",
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
];

const authModule = {
  routes,
};

export default authModule;
