import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Home from "./Home.jsx";
import ReadBlog from "./components/ReadBlog";
import Blog from "./Blog.jsx";
import ErrorPage from "./components/error-page.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/thoughts",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:topic/:slug",
    element: <ReadBlog />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BlogProvider>
      <RouterProvider router={router} />
    </BlogProvider>
  </React.StrictMode>
);