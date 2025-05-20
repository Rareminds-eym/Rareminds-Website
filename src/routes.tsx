import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderComponent from "./components/LoaderComponent";
import ErrorBoundary from "./components/ErrorBoundary";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import CorporateLayout from "./layouts/CorporateLayout";
import GovernmentLayout from "./layouts/GovernmentLayout";
import AcademiaLayout from "./layouts/AcademiaLayout";
import InstitutionsLayout from "./layouts/InstitutionsLayout";

// Lazy pages
const Home = lazy(() => import("./pages/Index"));
const Service = lazy(() => import("./pages/Corporate/Recruitment/Services/[service]"));
const Corporate = lazy(() => import("./pages/Corporate/Recruitment/Index"));
const Government = lazy(() => import("./pages/Government/Index"));
const Academia = lazy(() => import("./pages/Academia/Index"));
const Institutions = lazy(() => import("./pages/Institutions/Index"));
const InstitutionsServices = lazy(() => import("./pages/Institutions/InstitutionsServices"));
const FDP = lazy(() => import("./pages/Institutions/fdp"));
const ServicePage = lazy(() => import("./components/institutions/sdp/ServicePage")); // or correct path
const CorporateTraining = lazy(() => import("./pages/Corporate/Training"));
const Contact = lazy(() => import("./pages/Government/Contact/Index"));

const withSuspense = (Component: React.LazyExoticComponent<React.FC<{}>>) => (
  <Suspense fallback={<LoaderComponent />}>
    {" "}
    <Component />{" "}
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: withSuspense(Home),
      },
    ],
  },
  {
    element: (
      <CorporateLayout>
        <Outlet />
      </CorporateLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/corporate",
        element: withSuspense(Corporate),
      },
      {
        path: "/corporate/services/:name",
        element: withSuspense(Service),
      },
      {
        path: "/corporate/training",
        element: withSuspense(CorporateTraining),
      },
    ],
  },
  {
    element: (
      <GovernmentLayout>
        <Outlet />
      </GovernmentLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/government",
        element: withSuspense(Government),
      },
      {
        path: "/government/contact",
        element: withSuspense(Contact),
      },
    ],
  },
  {
    element: (
      <AcademiaLayout>
        <Outlet />
      </AcademiaLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/academia",
        element: withSuspense(Academia),
      },
    ],
  },
  {
    element: (
      <InstitutionsLayout>
        <Outlet />
      </InstitutionsLayout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/institutions",
        element: withSuspense(Institutions),
      },
       {
      path: "/institutions/services",
      element: withSuspense(InstitutionsServices),
    },
     {
  path: "/service/:id",
  element: (
    <Suspense fallback={<LoaderComponent />}>
      <ServicePage />
    </Suspense>
  ),
   },
{
        path: "/institutions/fdp",
        element: withSuspense(FDP),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);

export default router;
