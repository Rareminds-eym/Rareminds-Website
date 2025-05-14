import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import DefaultLayout from "./layouts/DefaultLayout";
import VerticalsLayout from "./layouts/VerticalsLayout";
import LoaderComponent from "./components/LoaderComponent";
import ErrorBoundary from "./components/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/Corporate/Index"));

const WithSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoaderComponent />}>{children}</Suspense>
);

const router = createBrowserRouter([
  // DefaultLayout for home page "/"
  {
    path: "/",
    element: (
      <DefaultLayout>
        <WithSuspense>
          <Outlet />
        </WithSuspense>
      </DefaultLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },

  // VerticalsLayout for other pages
  {
    element: (
      <VerticalsLayout>
        <WithSuspense>
          <Outlet />
        </WithSuspense>
      </VerticalsLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "corporate",
        element: <About />,
      },
      // Add other vertical routes here
    ],
  },

  // Catch-all route
  {
    path: "*",
    element: <ErrorBoundary />,
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
