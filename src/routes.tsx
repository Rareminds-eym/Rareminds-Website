import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoaderComponent from "./components/LoaderComponent";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/Corporate/Index"));

const LayoutWithSuspense = () => (
  <DefaultLayout>
    <Suspense fallback={<LoaderComponent />}>
      <Outlet />
    </Suspense>
  </DefaultLayout>
);

const router = createBrowserRouter([
  {
    element: <LayoutWithSuspense />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/corporate", element: <About /> },
    ],
  },
]);

export default router;