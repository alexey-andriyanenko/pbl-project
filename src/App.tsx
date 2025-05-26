import { BrowserRouter } from "react-router";

import { AppRoutes } from "src/routes";

import authModule from "src/auth-module";
import coreModule from "src/core-module";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes {...authModule} />
        <AppRoutes {...coreModule} />
      </BrowserRouter>
    </>
  );
}

export default App;
