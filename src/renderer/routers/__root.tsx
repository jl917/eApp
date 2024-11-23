import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<div>Loading</div>}>
      <Outlet />
    </Suspense>
  ),
  notFoundComponent: () => <div>notFount</div>,
});
