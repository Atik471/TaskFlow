import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import App from "../App";
import Register from "../components/Register";
import ErrorPage from "../components/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
