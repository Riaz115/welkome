import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`${prop.path}`} element={prop.component} key={key} />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      return null;
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full dark:!bg-navy-900">
        <main className={`mx-auto min-h-screen`}>
          <FixedPlugin />
          <Routes>
            {getRoutes(routes)}
            <Route
              path="/"
              element={<Navigate to="/sign-in/default" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
