import { BrowserRouter } from "react-router";

import { AppRoutes, IRoute } from "src/routes";

import authModule from "src/auth-module";
import coreModule from "src/core-module";
import { NotFoundRoute } from "./routes/not-found-route";

import { Providers as SharedProviders } from "src/shared-module/providers";

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
    <SharedProviders>
      <BrowserRouter>
        <AppRoutes routes={appRoutes} />
      </BrowserRouter>
    </SharedProviders>
  );
}

export default App;
