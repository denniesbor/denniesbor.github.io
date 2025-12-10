import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Imports
import Home from "./Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Thoughts from "./pages/Thoughts.jsx";
import ThoughtDetail from "./pages/ThoughtDetail.jsx";
import Resume from "./pages/Resume.jsx";
import Presentations from "./pages/Presentations.jsx";
import ErrorPage from "./components/common/error-page.jsx";
import Layout from "./components/common/Layout.jsx";
import SpaceWeatherGrid from './pages/SpaceWeatherGrid';

import "./index.css";

const router = createBrowserRouter([
  // 1. HOME (Unique Layout with Sidebar)
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },

  // 2. SHARED LAYOUT (Navigation + Footer for everything else)
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/portfolio/:id",
        element: <ProjectDetail />,
      },
      {
        path: "/thoughts",
        element: <Thoughts />,
      },
      {
        path: "/thoughts/:category/:slug",
        element: <ThoughtDetail />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/presentations",
        element: <Presentations />,
      },
      { path: "/portfolio/space-weather-grid", element: <SpaceWeatherGrid /> }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);