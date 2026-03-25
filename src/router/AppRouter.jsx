import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SoonPage from "../pages/SoonPage";
import ContactPage from "../pages/ContactPage";
import WelcomeUserPage from "../pages/WelcomeUserPage";
import DashboardUserPage from "../pages/DashboardUserPage";
import DiagnosticFormPage from "../pages/DiagnosticFormPage";
import PaymentPage from "../pages/PaymentPage";
import SuccessfulPage from "../pages/SuccessfulPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "soon", element: <SoonPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "welcome", element: <WelcomeUserPage /> },
      { path: "userdash", element: <DashboardUserPage /> },
      { path: "diagnostic", element: <DiagnosticFormPage /> },
      { path: "diagnostic/:id", element: <DiagnosticFormPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "successful", element: <SuccessfulPage /> },
    ],
  },
]);