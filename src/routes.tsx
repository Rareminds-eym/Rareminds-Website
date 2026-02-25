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
import UniversitiesLayout from "./layouts/UniversitiesLayout";

// Direct imports for direct use in routes
import BlogDetailAcademia from "./components/Academy/Blogs/BlogDetail";
import BlogDetailGov from "./components/Govt/Blogs/BlogDetail.tsx";
import CourseDetailedPage from "@/components/Academy/Students/CourseDetailedPage";


// Lazy pages
const Home = lazy(() => import("./pages/Index"));
const Blogs = lazy(() => import("./pages/Blogs/index"));
const Events = lazy(() => import("./pages/Events/index"));
const EventDetail = lazy(() => import("./components/Events/EventDetail"));
const EventsGridPage = lazy(() => import("./components/Events/EventsGridPage"));
const Careers = lazy(() => import("./pages/Careers/index"));
const ContactPage = lazy(() => import("./pages/Contact/index"));
const Gallery = lazy(() => import("./pages/Gallery/index"));
const About = lazy(() => import("./pages/About/index.tsx"));
const Hackathons = lazy(() => import("./pages/Hackathons/index"));
const HackathonResults = lazy(() => import("./pages/Hackathons/Results"));
const Service = lazy(
  () => import("./pages/Corporate/Recruitment/Services/[service]")
);
const Corporate = lazy(() => import("./pages/Corporate/Recruitment/Index"));
const ContactForm = lazy(
  () => import("./pages/Corporate/ContactPage/ContactForm.tsx")
);
const BlogDetail = lazy(() => import("./pages/Blogs/BlogDetail.tsx"));
const ServicesPage = lazy(
  () => import("./pages/Corporate/Recruitment/Services/Index.tsx")
);
const Government = lazy(() => import("./pages/Government/Index"));
const Academia = lazy(() => import("./pages/Academia/Index"));
const AcademiaBlogs = lazy(() => import("./pages/Academia/Blogs/index"));
const Student = lazy(() => import("./pages/Academia/Student/student"));
const School = lazy(() => import("./pages/Academia/Teacher/teacher.tsx"));
const Universities = lazy(() => import("./pages/Universities/Index"));
const SDPLandingPage = lazy(() => import("./pages/Universities/sdp/SDPLandingPage"));
const ServiceCategoriesPage = lazy(() => import("./pages/Universities/sdp/ServiceCategoriesPage"));
const UniversitiesServices = lazy(
  () => import("./pages/Universities/UniversitiesServices")
);
const FDP = lazy(() => import("./pages/Universities/Fdp"));
const ServiceCategoryCard = lazy(
  () => import("./components/universities/sdp/ServiceCategoryCard/ServiceCategoryCard")
);
const CoursesListingPage = lazy(
  () => import("./pages/Universities/sdp/CoursesListingPage")
);
const CourseDetailPage = lazy(
  () => import("./pages/Universities/sdp/CourseDetailPage")
);
const ServiceDetailPage = lazy(
  () => import("./pages/Universities/sdp/ServiceDetailPage")
);
const CorporateTraining = lazy(
  () => import("./pages/Corporate/Training/Home/index.tsx")
);
const Contact = lazy(() => import("./pages/Government/Contact/Index"));
const handleSubscribe = lazy(() => import("./pages/Academia/ComingSoon"));
const CorporateCourseDetailPage = lazy(
  () => import("./pages/Corporate/Training/Services/CourseDetailPage.tsx")
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
const CorporateTrainingServicesPage = lazy(
  () => import("./pages/Corporate/Training/ServicesPage.tsx")
);
const CorporateCoursesPage = lazy(
  () => import("./pages/Corporate/Training/Services/CoursesPage.tsx")
);

// Passport page
const Passport = lazy(() => import("./pages/Corporate/Passport/Index.tsx"));
const UniversitiesPassport = lazy(() => import("./pages/Universities/Passport/Index.tsx"));


const BlogListing = lazy(() => import("./components/universities/Blogs/BlogListing"));
import CommunicationPersonalityDevelopment from "./components/universities/inst/CommunicationPersonalityDevelopment";
import MentalHealthCounselingFDP from "./components/universities/inst/MentalHealthCounselingFDP";
import DomainSpecificPrograms from "./components/universities/inst/DomainSpecificPrograms";
import LeadershipCareerGrowth from "./components/universities/inst/LeadershipCareerGrowth";
import InstitutionalValueAdded from "./components/universities/inst/InstitutionalValueAdded";
// New Projects components
const NewProjects = lazy(() => import("./components/Projects/project.tsx"));
const NewProjectDetail = lazy(() => import("./components/Projects/ProjectDetailNew.tsx"));

const InstitutionsBlogDetail = lazy(() => import("./components/universities/Blogs/BlogDetail"));

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
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
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
        element: withSuspense(BlogDetail),
      },
      {
        path: "/events",
        element: withSuspense(Events),
      },
        {
          path: "/events/all",
          element: withSuspense(EventsGridPage),
        },
      {
        path: "/events/:slug",
        element: withSuspense(EventDetail),
      },
      {
        path: "/careers",
        element: withSuspense(Careers),
      },
      {
        path: "/contact",
        element: withSuspense(ContactPage),
      },
      {
        path: "/contact-us",
        element: withSuspense(ContactPage),
      },
      {
        path: "/gallery",
        element: withSuspense(Gallery),
      },
      {
        path: "/about",
        element: withSuspense(About),
      },
      {
        path: "/hackathons",
        element: withSuspense(Hackathons),
      },
      {
        path: "/hackathons/:slug/results",
        element: withSuspense(HackathonResults),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <CorporateLayout>
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
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
      // Corporate Training Routes
      {
        path: "/corporate/training",
        element: withSuspense(CorporateTraining), // Training landing page - NO redirect
      },
      {
        path: "/corporate/training/services",
        element: withSuspense(CorporateTrainingServicesPage), // Services listing page
      },
      {
        path: "/corporate/training/services/:serviceSlug",
        element: withSuspense(CorporateCoursesPage), // Courses page for specific service
      },
      {
        path: "/corporate/training/services/:serviceSlug/course/:programId",
        element: withSuspense(CorporateCourseDetailPage), // Individual course detail
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
        element: withSuspense(Blogs),
      },
      {
        path: "/corporate/skill-passport",
        element: withSuspense(Passport),
      },
      {
        path: "/corporate/training/blogs/:slug",
        element: withSuspense(BlogDetail),
      },
      {
        path: "/corporate/recruitment/blogs",
        element: withSuspense(Blogs),
      },
      {
        path: "/corporate/recruitment/blogs/:slug",
        element: withSuspense(BlogDetail),
      },
      {
        path: "/corporate/recruitment/services",
        element: withSuspense(ServicesPage),
      },
      {
        path: "/corporate/training/services",
        element: withSuspense(CorporateTrainingServicesPage),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <GovernmentLayout>
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
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
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
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
      },      {
        path: "/school/teacher/tdp",
        element: withSuspense(TDPPage),
      },      // New Projects routes
      {
        path: "/school/new-projects",
        element: withSuspense(NewProjects),
      },
      {
        path: "/school/new-projects/:projectId",
        element: withSuspense(NewProjectDetail),
      },
    ],
  },
  {
    element: (
      <>
        <ScrollToTop />
        <UniversitiesLayout>
          <Suspense fallback={<LoaderComponent />}>
            <Outlet />
          </Suspense>
        </UniversitiesLayout>
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/universities",
        element: withSuspense(Universities),
      },
      {
        path: "/universities/sdp/:institutionType/categories",
        element: withSuspense(ServiceCategoriesPage),
      },
      {
        path: "/service/:id",
        element: (
          <Suspense fallback={<LoaderComponent />}>
            <ServiceCategoryCard />
          </Suspense>
        ),
      },
      {
        path: "/universities/sdp/:institutionType/:categorySlug",
        element: withSuspense(ServiceDetailPage),
      },
      {
        path: "/universities/sdp/:institutionType/:categorySlug/courses",
        element: withSuspense(CoursesListingPage),
      },
      {
        path: "/universities/sdp/course/:courseSlug",
        element: withSuspense(CourseDetailPage),
      },
      {
        path: "/universities/fdp",
        element: withSuspense(FDP),
      },
      {
        path: "/universities/communication-personality-development",
        element: <CommunicationPersonalityDevelopment />,
      },
      {
        path: "/universities/mental-health-counseling-fdp",
        element: <MentalHealthCounselingFDP />,
      },
      {
        path: "/universities/domain-specific-programs",
        element: <DomainSpecificPrograms />,
      },
      {
        path: "/universities/leadership-career-growth",
        element: <LeadershipCareerGrowth />,
      },
      {
        path: "/universities/institutional-value-added-services",
        element: <InstitutionalValueAdded />,
      },
      // Blog routes
      {
        path: "/universities/blogs",
        element: withSuspense(BlogListing),
      },
      {
        path: "/universities/blogs/:slug",
        element: withSuspense(InstitutionsBlogDetail),
      },
      {
        path: "/universities/sdp/blogs",
        element: withSuspense(BlogListing),
      },
      {
        path: "/universities/sdp/blogs/:slug",
        element: withSuspense(InstitutionsBlogDetail),
      },
      {
        path: "/universities/fdp/blogs",
        element: withSuspense(BlogListing),
      },
      {
        path: "/universities/fdp/blogs/:slug",
        element: withSuspense(InstitutionsBlogDetail),
      },
      {
       path: "/universities/skill-passport",
        element: withSuspense(UniversitiesPassport),
      }
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);

export default router;