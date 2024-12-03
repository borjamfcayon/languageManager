import PrivateLayout from "../../pages/layout/PrivateLayout";
import RootLayout from "../../pages/layout/RootLayout";
import { Home } from "../../pages/private/Home";
import { Login } from "../../pages/public/Login";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/private" replace />,
      },
      {
        path: "private",
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
