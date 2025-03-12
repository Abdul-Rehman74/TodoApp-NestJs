import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useRoutes } from "./routes";
import Home from "../views/Home";
import Auth from "../views/Auth";
import ProtectedRoute from "./protectedRote";

const LazyRoutes = lazy(() => import("../layout"));

const AppRoutes = () => {
  const routes = useRoutes();

  return (
    <Suspense>
      <Routes>
        <Route element={<LazyRoutes />}>
          {/* {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))} */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
