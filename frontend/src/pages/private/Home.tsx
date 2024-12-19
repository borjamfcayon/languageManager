import Logo from "../../assets/Logo.webp";
import { LogOut, Settings } from "lucide-react";
import { Languages } from "../../lib/components/classes/Languages";
import { ClassMates } from "../../lib/components/classMates/ClassMates";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { NextClases } from "../../lib/components/nextClases/NextClases";
import { Tooltip } from "@mui/material";

export const Home = () => {
  const navigate = useNavigate(); // Navegación a diferentes rutas
  const role = useRole(); // Obtiene el rol del usuario actual

  // Función para cerrar sesión y redirigir a la página principal
  const handleLogOut = () => {
    localStorage.removeItem("token"); // Elimina el token de autenticación
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="h-screen w-full grid grid-cols-11 grid-rows-12 gap-2">
      {/* Botón para cerrar sesión */}
      <div className="col-start-11 row-start-1 flex flex-row justify-end items-center gap-2 text-white">
        <Tooltip title="Cerrar sesión" arrow>
          <div
            className="mr-6 bg-red-500 p-3 rounded-md shadow-md cursor-pointer hover:bg-red-600"
            onClick={handleLogOut}
          >
            <LogOut size={30} />
          </div>
        </Tooltip>
      </div>

      {/* Sección de clases próximas */}
      <div className="bg-white rounded-md shadow-md col-start-2 col-end-7 row-start-2 row-end-6 grid gap-2">
        <NextClases />
      </div>

      {/* Compañeros de clase */}
      <div className="bg-white rounded-md shadow-md col-start-2 col-end-6 row-start-6 row-end-12 grid gap-2">
        <ClassMates />
      </div>

      {/* Sección de idiomas */}
      <div className="bg-white rounded-md shadow-md col-start-7 col-end-11 row-start-2 row-end-8 grid gap-2">
        <Languages />
      </div>

      {/* Novedades */}
      <div className="bg-white rounded-md shadow-md col-start-6 col-end-11 row-start-8 row-end-12 grid gap-2">
        <div className="flex flex-col justify-center items-center p-4 gap-2">
          <h6 className="text-2xl font-bold">Novedades</h6>
          <p>Mantenimiento...</p>
        </div>
      </div>

      {/* Bloque de configuración o logo */}
      <div className="col-start-6 col-end-7 row-start-6 row-end-8 grid gap-2">
        {role === "admin" ? (
          <div
            className="bg-white rounded-md shadow-md flex justify-center items-center p-4 cursor-pointer hover:bg-blue-50"
            onClick={() => navigate("all")} // Navegar a la página de administración
          >
            <Settings size={60} />
          </div>
        ) : (
          <div className="flex justify-center items-center p-4">
            <img src={Logo} alt="Logo" className="w-auto h-full" />{" "}
            {/* Mostrar el logo */}
          </div>
        )}
      </div>
    </div>
  );
};
