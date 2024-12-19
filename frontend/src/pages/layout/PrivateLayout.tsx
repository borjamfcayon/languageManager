import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useVerifyToken } from "../../lib/api/AuthApi";
import { RoleProvider } from "../../context/RoleContext";
import { useGetRole } from "../../lib/api/RoleApi";

// Componente que gestiona la vista privada de la aplicación, donde se requiere autenticación y autorización
const PrivateLayout = () => {
  // Verificación del token de autenticación utilizando el hook `useVerifyToken`
  const { isLoading, data } = useVerifyToken(
    localStorage.getItem("token") || ""
  );

  // Obtención del rol del usuario utilizando el hook `useGetRole`
  const { isLoading: roleLoading, data: dataRole, error } = useGetRole();

  // Si aún se están verificando los datos de autenticación o el rol, se muestra un spinner de carga
  if (isLoading || roleLoading) {
    return (
      <div className="h-full flex justify-center items-center text-blue-600 animate-spin">
        <Loader2 size={100} />{" "}
        {/* Muestra un spinner mientras se cargan los datos */}
      </div>
    );
  }

  // Si ocurre un error en la obtención del rol, se redirige al usuario al login
  if (error) {
    return <Navigate to="/login" />; // Si hay un error en la obtención del rol, se redirige al login
  }

  // Si el token es válido y el usuario está autorizado, se proporciona el rol y se renderiza el contenido de las rutas hijas
  if (data?.authorized) {
    return (
      <RoleProvider role={dataRole.role}>
        <Outlet />{" "}
      </RoleProvider>
    ); // Proporciona el rol a través de `RoleProvider` y renderiza las rutas hijas
  }

  // Si el token no es válido o el usuario no está autorizado, se redirige al login
  return <Navigate to="/login" />; // Si no está autorizado, redirige al login
};

// Exportación del componente PrivateLayout para su uso en las rutas protegidas
export default PrivateLayout;
