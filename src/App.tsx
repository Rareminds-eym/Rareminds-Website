import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoaderComponent from "@/components/LoaderComponent";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/Corporate/Recruitment/Index"));
const Government = lazy(() => import("./pages/Government/Index"));
const Passport = lazy(() => import("./pages/Corporate/Passport/Index"));


const App: React.FC = () => {
  return (
    <>
      <Router>
        <DefaultLayout>
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/corporate" element={<About />} />
              <Route path="/government" element={<Government />} />
              <Route path="/passport" element={<Passport />} />
            </Routes>
          </Suspense>
        </DefaultLayout>
      </Router>
    </>
  );
}

export default App;
