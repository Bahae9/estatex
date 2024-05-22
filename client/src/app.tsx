import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./components/404";
import { AuthProvider } from "./components/contexts/auth-context";
import Admin from "./components/routes/admin";
import Agents from "./components/routes/admin/_components/agents";
import Clients from "./components/routes/admin/_components/clients";
import Contracts from "./components/routes/admin/_components/contracts";
import Feedbacks from "./components/routes/admin/_components/feedbacks";
import RealEstates from "./components/routes/admin/_components/real-estates";
import Transactions from "./components/routes/admin/_components/transactions";
import AdminRoot from "./components/routes/admin/admin-root";
import Login from "./components/routes/auth/login";
import Signup from "./components/routes/auth/signup";
import Dashboard from "./components/routes/dashboard";
import About from "./components/routes/platform/about";
import Contact from "./components/routes/platform/contact";
import EditProfile from "./components/routes/platform/edit-profile";
import Feedback from "./components/routes/platform/feedback";
import ClientsFeedbacks from "./components/routes/platform/feedback/clients-feedbacks";
import UserFeedbacksDetails from "./components/routes/platform/feedback/user-feedbacks-details";
import Home from "./components/routes/platform/home";
import Privacy from "./components/routes/platform/privacy";
import RealEstate from "./components/routes/platform/real-estate";
import Root from "./components/routes/platform/root";
import Terms from "./components/routes/platform/terms";
import { Toaster } from "./components/ui/toaster";
import {
  adminFeedbacksLoader,
  adminHomeLoader,
  adminRealEstatesLoader,
  agentsLoader,
  authLoader,
  clientsLoader,
  contractsLoader,
  dashboardLoader,
  feedbackLoader,
  feedbacksWithUserLoader,
  homeLoader,
  transactionsLoader,
  userFeedbacksLoader,
  realEstatesWithUserLoader,
  detailedBuyedLoader,
} from "./utils/loaders";
import DetailedRealEstate from "./components/routes/admin/_components/real-estates/detailed-real-estate";
import FeedbackRoot from "./components/routes/platform/feedback/feedback-root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    loader: authLoader,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Root />,
        children: [
          {
            path: "",
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "real-estates",
            element: (
              <div className="p-6 lg:p-8">
                <Outlet />
              </div>
            ),
            children: [
              {
                path: "",
                loader: realEstatesWithUserLoader,
                element: <RealEstate />,
              },
              {
                path: ":realEstateId",
                loader: detailedBuyedLoader,
                element: <DetailedRealEstate isAdmin={false} />,
              },
            ],
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "feedbacks",
            element: <FeedbackRoot />,
            children: [
              {
                path: "",
                loader: feedbackLoader,
                element: <Feedback />,
              },
              {
                path: "clients-feedbacks",
                loader: feedbacksWithUserLoader,
                element: <ClientsFeedbacks />,
              },
              {
                path: "my-feedbacks",
                loader: userFeedbacksLoader,
                element: <UserFeedbacksDetails />,
              },
            ],
          },
          {
            path: "dashboard",
            element: (
              <div className="p-6 lg:p-8">
                <Outlet />
              </div>
            ),
            children: [
              {
                path: "",
                loader: dashboardLoader,
                element: <Dashboard />,
              },
              {
                path: ":realEstateId",
                loader: detailedBuyedLoader,
                element: <DetailedRealEstate isAdmin={false} />,
              },
            ],
          },
          {
            path: "terms",
            element: <Terms />,
          },
          {
            path: "privacy",
            element: <Privacy />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminRoot />,
        children: [
          {
            path: "",
            element: <Admin />,
            loader: adminHomeLoader,
          },
          {
            path: "real-estates",
            children: [
              {
                path: "",
                element: <RealEstates />,
                loader: adminRealEstatesLoader,
              },
              {
                path: ":realEstateId",
                loader: detailedBuyedLoader,
                element: <DetailedRealEstate isAdmin={true} />,
              },
            ],
          },
          { path: "clients", element: <Clients />, loader: clientsLoader },
          { path: "agents", element: <Agents />, loader: agentsLoader },
          {
            path: "feedbacks",
            element: <Feedbacks />,
            loader: adminFeedbacksLoader,
          },
          {
            path: "transactions",
            element: <Transactions />,
            loader: transactionsLoader,
          },
          {
            path: "contracts",
            element: <Contracts />,
            loader: contractsLoader,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
