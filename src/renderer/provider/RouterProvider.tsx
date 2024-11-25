import { createRouter, RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const RouterProvider = () => <TanstackRouterProvider router={router} />;

export default RouterProvider;