import { BrowserRouter } from "react-router";

import authModule from "src/auth-module";
import { AppRoutes } from "src/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes {...authModule} />
      </BrowserRouter>
    </>
  );
}

export default App;
