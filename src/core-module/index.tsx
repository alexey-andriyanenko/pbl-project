import { IRoute } from "src/routes";

import Home from "src/core-module/pages/home";

export const CoreRoutes = {
  home: "/",
};

const routes: IRoute[] = [
  {
    path: CoreRoutes.home,
    element: <Home />,
  },
];

const coreModule = {
  routes,
};

export default coreModule;
