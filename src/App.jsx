import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LoaderComponent from "@/components/LoaderComponent";
import "./App.css";
import Navbar from "./components/Navbar/Navbar"

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/Corporate/Index"));

function App() {
  return (
    <>
      <Router>
        {/* <DefaultLayout> */}
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/corporate" element={<About />} />
              <Route path="/nav" element={<Navbar />} />
            </Routes>
          </Suspense>
        {/* </DefaultLayout> */}
      </Router>
    </>
  );
}

export default App;
