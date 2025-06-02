import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthProvider } from "@/context/AuthContext";

// Import required Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import './index.css'
import "./App.css";
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
    </Provider>
  </React.StrictMode>
);