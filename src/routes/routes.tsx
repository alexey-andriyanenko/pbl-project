import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";

import { PrivateRoute } from "./private-route";
import { IRoute } from "./routes.types";
import { PublicLayout } from "./public-route/public-layout";

interface IRoutesProps {
  routes: IRoute[];
}

export const AppRoutes: React.FC<IRoutesProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((props) => (
        <>
          {props.isPrivate ? (
            <Route
              key={props.path}
              path={props.path}
              element={<PrivateRoute>{props.element}</PrivateRoute>}
            />
          ) : (
            <Route
              key={props.path}
              path={props.path}
              element={<PublicLayout>{props.element}</PublicLayout>}
            />
          )}
        </>
      ))}
    </Routes>
  );
};
