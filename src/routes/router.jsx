import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UpdateLabel from "../pages/UpdateLabel";
import AdminLayout from "../layout/AdminLayout";
import UpdateArticle from "../pages/UpdateArticle";
import UpdateUser from "../pages/UpdateUser";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import AddArticle from "../pages/AddArticle";
import ProtectedRoute from './ProtectedRoute ';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-label/:id",
    element: (
      <ProtectedRoute>
        <UpdateLabel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-article",
    element: (
      <ProtectedRoute>
        <AddArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-article/:id",
    element: (
      <ProtectedRoute>
        <UpdateArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-user/:id",
    element: (
      <ProtectedRoute>
        <UpdateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
