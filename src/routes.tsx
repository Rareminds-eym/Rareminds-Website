import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderComponent from "./components/LoaderComponent";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import CorporateLayout from "./layouts/CorporateLayout";
import GovernmentLayout from "./layouts/GovernmentLayout";
import AcademiaLayout from "./layouts/AcademiaLayout";
import InstitutionsLayout from "./layouts/InstitutionsLayout";
import Courses from "./components/Academy/Students/Courses.tsx";

// Lazy pages
const Home = lazy(() => import("./pages/Index"));
const Service = lazy(
  () => import("./pages/Corporate/Recruitment/Services/[service]")
);
const Corporate = lazy(() => import("./pages/Corporate/Recruitment/Index"));
const Government = lazy(() => import("./pages/Government/Index"));
const Academia = lazy(() => import("./pages/Academia/Index"));
const Student = lazy(() => import("./pages/Academia/Student/student"));
const School = lazy(() => import("./pages/Academia/School/teacher"));
const Institutions = lazy(() => import("./pages/Institutions/Index"));
const InstitutionsServices = lazy(
  () => import("./pages/Institutions/InstitutionsServices")
);
const FDP = lazy(() => import("./pages/Institutions/Fdp"));
const ServicePage = lazy(
  () => import("./components/institutions/sdp/ServicePage")
);
const CorporateTraining = lazy(() => import("./pages/Corporate/Training"));
const Contact = lazy(() => import("./pages/Government/Contact/Index"));
const handleSubscribe = lazy(() => import("./pages/Academia/ComingSoon"));
const course = lazy(() => import("./pages/Academia/Student/[course].tsx"));
const LeadershipPrograms = lazy(
  () => import("./pages/Corporate/Training/service/LeadershipPrograms.tsx")
);
const Projectlist = lazy(() => import("./pages/Academia/projects/projectlist"));
const Naan = lazy(() => import("./pages/Academia/projects/[name]"));
const CaseStudy = lazy(() => import("./pages/Academia/School/CaseStudy"));
const Academy_Course = lazy(
  () => import("./pages/Academia/School/CourseDetailed")
);
import CourseDetailedPage from "@/components/Academy/Students/CourseDetailedPage";

const withSuspense = (Component: React.LazyExoticComponent<React.FC<{}>>) => (
  <Suspense fallback={<LoaderComponent />}>
    {" "}
    <Component />{" "}
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </>
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
      <>
        <ScrollToTop />
        <CorporateLayout>
          <Outlet />
        </CorporateLayout>
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/corporate/recruitment",
        element: withSuspense(Corporate),
      },
      {
        path: "/corporate/recruitment/services/:name",
        element: withSuspense(Service),
      },
      {
        path: "/corporate/training",
        element: withSuspense(CorporateTraining),
      },
      {
        path: "/corporate/training/services/:id",
        element: withSuspense(LeadershipPrograms),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <GovernmentLayout>
          <Outlet />
        </GovernmentLayout>
      </>
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
      {
        path: "/academia/projects/",
        element: withSuspense(Projectlist),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <AcademiaLayout>
          <Outlet />
        </AcademiaLayout>
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/academia",
        element: withSuspense(Academia),
      },
      {
        path: "/academia/student",
        element: withSuspense(Student),
      },
      {
        path: "/academia/school",
        element: withSuspense(School),
      },
      {
        path: "/academia/coming-soon",
        element: withSuspense(handleSubscribe),
      },

      {
        path: "/academia/projects/",
        element: withSuspense(Projectlist),
      },
      {
        path: "/academia/projects/:name",
        element: withSuspense(Naan),
      },
      {
        path: "/academia/case-study/:id",
        element: withSuspense(CaseStudy),
      },

      {
        path: "/academia/student/course/:courseId", // Individual course detail
        element: <CourseDetailedPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/academia/school/Courses/:id",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <Academy_Course />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <InstitutionsLayout>
          <Outlet />
        </InstitutionsLayout>
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/Institutions",
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
