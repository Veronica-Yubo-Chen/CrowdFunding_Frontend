import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import NavBar from "./components/NavBar.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateFundraiserPage from "./pages/CreateFundraiserPage.jsx";
import FundraiserDetailPage from "./pages/FundraiserDetailPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Context
import { AuthProvider } from "./components/AuthProvider.jsx";

// Global styles
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/create-fundraiser", element: <CreateFundraiserPage /> },
      { path: "/fundraiser/:id", element: <FundraiserDetailPage /> },
      { path: "/profile", element: <UserProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);