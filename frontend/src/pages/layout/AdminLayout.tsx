import { Navigate, Outlet } from "react-router-dom"; 
import { useRole } from "../../context/RoleContext";

// Componente que define la estructura de la página de administración
const AdminLayout = () => {
  // Obtener el rol del usuario a través del hook `useRole`
  const role = useRole();

  // Si el rol del usuario es "admin", se renderiza el contenido de las rutas hijas
  if (role === "admin") {
    return <Outlet />; // `Outlet` renderiza el componente correspondiente a la ruta hija
  }

  // Si el rol del usuario no es "admin", redirige al usuario a la página de inicio de sesión
  return <Navigate to="/login" />; // Redirige a "/login" si el usuario no tiene el rol "admin"
};

// Exportación del componente AdminLayout para su uso en otras partes de la aplicación
export default AdminLayout;
