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

// Direct imports for direct use in routes
import BlogDetailAcademia from "./components/Academy/Blogs/BlogDetail";
import BlogDetail from "./pages/Blogs/BlogDetail.tsx";
import BlogDetailGov from "./components/Govt/Blogs/BlogDetail.tsx";
import CourseDetailedPage from "@/components/Academy/Students/CourseDetailedPage";
// Lazy pages
const Home = lazy(() => import("./pages/Index"));
const Blogs = lazy(() => import("./pages/Blogs/index"));
const Service = lazy(
  () => import("./pages/Corporate/Recruitment/Services/[service]")
);
const Corporate = lazy(() => import("./pages/Corporate/Recruitment/Index"));
const ContactForm = lazy(
  () => import("./pages/Corporate/ContactPage/ContactForm.tsx")
);
const Corporate_Blogs = lazy(
  () => import("./pages/Corporate/Recruitment/Blogs/Index")
);
const BlogPost = lazy(
  () => import("./pages/Corporate/Recruitment/Blogs/[slug]")
);
const ServicesPage = lazy(
  () => import("./pages/Corporate/Recruitment/Services/Index.tsx")
);
const Government = lazy(() => import("./pages/Government/Index"));
const Academia = lazy(() => import("./pages/Academia/Index"));
const AcademiaBlogs = lazy(() => import("./pages/Academia/Blogs/index"));
const Student = lazy(() => import("./pages/Academia/Student/student"));
const School = lazy(() => import("./pages/Academia/Teacher/teacher.tsx"));
const Institutions = lazy(() => import("./pages/Institutions/Index"));
const InstitutionsServices = lazy(
  () => import("./pages/Institutions/InstitutionsServices")
);
const FDP = lazy(() => import("./pages/Institutions/Fdp"));
const ServicePage = lazy(
  () => import("./components/institutions/sdp/ServicePage")
);
const CorporateTraining = lazy(
  () => import("./pages/Corporate/Training/Home/index.tsx")
);
const Contact = lazy(() => import("./pages/Government/Contact/Index"));
const handleSubscribe = lazy(() => import("./pages/Academia/ComingSoon"));
const LeadershipPrograms = lazy(
  () => import("./pages/Corporate/Training/Services/[slug].tsx")
);
const Projectlist = lazy(() => import("./pages/Academia/projects/projectlist"));
const Naan = lazy(() => import("./pages/Academia/projects/[name]"));
const CaseStudy = lazy(() => import("./pages/Academia/Teacher/CaseStudy.tsx"));
const Academy_Course = lazy(
  () => import("./pages/Academia/Teacher/CourseDetailed.tsx")
);

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const TDPPage = lazy(() => import("./pages/Academia/Teacher/TDPPage.tsx"));
const CorporateTrainingServicesIndex = lazy(
  () => import("./pages/Corporate/Training/Services/Index.tsx")
);

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
      {
        path: "/privacy-policy",
        element: withSuspense(PrivacyPolicy),
      },
      {
        path: "/terms",
        element: withSuspense(Terms),
      },
      {
        path: "/blogs",
        element: withSuspense(Blogs),
      },
      {
        path: "/blogs/:slug",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <BlogDetail />
          </Suspense>
        ),
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
      {
        path: "/corporate/training/contact",
        element: withSuspense(ContactForm),
      },
      {
        path: "/corporate/recruitment/contact",
        element: withSuspense(ContactForm),
      },
      {
        path: "/corporate/training/blogs",
        element: withSuspense(Corporate_Blogs),
      },
      {
        path: "/corporate/recruitment/blogs",
        element: withSuspense(Corporate_Blogs),
      },
      {
        path: "/corporate/recruitment/blogs/:slug",
        element: withSuspense(BlogPost),
      },
      {
        path: "/corporate/recruitment/services",
        element: withSuspense(ServicesPage),
      },
      {
        path: "/corporate/training/services",
        element: withSuspense(CorporateTrainingServicesIndex),
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
        path: "/school/projects/",
        element: withSuspense(Projectlist),
      },
      {
        path: "/government/blogs",
        element: withSuspense(
          lazy(() => import("./pages/Government/Blogs/index"))
        ),
      },
      {
        path: "/government/blogs/:slug",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <BlogDetailGov />
          </Suspense>
        ),
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
        path: "/school",
        element: withSuspense(Academia),
      },
      {
        path: "/school/student",
        element: withSuspense(Student),
      },
      {
        path: "/school/teacher",
        element: withSuspense(School),
      },
      {
        path: "/school/blogs",
        element: withSuspense(AcademiaBlogs),
      },
      {
        path: "/school/student/blogs",
        element: withSuspense(AcademiaBlogs),
      },
      {
        path: "/school/teacher/blogs",
        element: withSuspense(AcademiaBlogs),
      },
      {
        path: "/school/student/blogs/:slug",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <BlogDetailAcademia />
          </Suspense>
        ),
      },
      {
        path: "/school/teacher/blogs/:slug",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <BlogDetailAcademia />
          </Suspense>
        ),
      },
      {
        path: "/school/coming-soon",
        element: withSuspense(handleSubscribe),
      },
      {
        path: "/school/projects/",
        element: withSuspense(Projectlist),
      },
      {
        path: "/school/projects/:name",
        element: withSuspense(Naan),
      },
      {
        path: "/school/case-study/:id",
        element: withSuspense(CaseStudy),
      },
      {
        path: "/school/student/course/:courseId", // Individual course detail
        element: <CourseDetailedPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/school/teacher/Courses/:id",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <Academy_Course />
          </Suspense>
        ),
      },
      {
        path: "/school/teacher/tdp",
        element: withSuspense(TDPPage),
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
