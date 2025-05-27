import { BrowserRouter } from "react-router";

import { AppRoutes, IRoute } from "src/routes";

import authModule from "src/auth-module";
import coreModule from "src/core-module";
import { NotFoundRoute } from "./routes/not-found-route";

const appRoutes: IRoute[] = [
  ...authModule.routes,
  ...coreModule.routes,
  {
    path: "*",
    element: <NotFoundRoute />,
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes routes={appRoutes} />
      </BrowserRouter>
    </>
  );
}

export default App;
