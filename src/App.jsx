import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoaderComponent from "@/components/LoaderComponent";
import "./App.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/Corporate/Index"));

function App() {
  return (
    <>
      <Router>
        <DefaultLayout>
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/corporate" element={<About />} />
            </Routes>
          </Suspense>
        </DefaultLayout>
      </Router>
    </>
  );
}

export default App;
