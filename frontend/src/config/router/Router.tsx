import AdminLayout from "../../pages/layout/AdminLayout";
import PrivateLayout from "../../pages/layout/PrivateLayout";
import RootLayout from "../../pages/layout/RootLayout";
import { AllUsers } from "../../pages/private/AllUsers";
import { Home } from "../../pages/private/Home";
import { Login } from "../../pages/public/Login";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Definición de las rutas de la aplicación usando createBrowserRouter
export const Router = createBrowserRouter([  
  {
    path: "/", // Ruta raíz de la aplicación
    element: <RootLayout />, // Componente que se muestra en la ruta raíz
    children: [ // Rutas hijas de la ruta raíz
      {
        index: true, // La ruta predeterminada si no se especifica una subruta
        element: <Navigate to="/login" replace />, // Redirige a la página de login
      },
      {
        path: "private", // Ruta para la sección privada
        element: <PrivateLayout />, // Layout para la sección privada
        children: [ // Rutas hijas de la sección privada
          {
            index: true, // Ruta predeterminada de la sección privada
            element: <Home />, // Página de inicio de la sección privada
          },
          {
            path: "all", // Ruta para la sección de administración de usuarios
            element: <AdminLayout />, // Layout para la sección de administración
            children: [ // Rutas hijas de la sección de administración
              {
                index: true, // Ruta predeterminada de la sección de administración
                element: <AllUsers />, // Página que muestra todos los usuarios
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "login", // Ruta para la página de inicio de sesión
    element: <Login />, // Página de inicio de sesión
  },
  {
    path: "*", // Ruta para manejar rutas no encontradas (404)
    element: <div>404 Not Found</div>, // Mensaje de error cuando la ruta no existe
  },
]);