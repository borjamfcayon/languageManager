import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useVerifyToken } from "../../lib/api/AuthApi";
import { RoleProvider } from "../../context/RoleContext";
import { useGetRole } from "../../lib/api/RoleApi";

const PrivateLayout = () => {
  const { isLoading, data } = useVerifyToken(localStorage.getItem("token") || "");
  const { isLoading: roleLoading, data: dataRole, error } = useGetRole();


  if (isLoading || roleLoading) {
    return (
      <div className="h-full flex justify-center items-center text-blue-600 animate-spin"><Loader2 size={100} /></div>
    );

  }

  if (error) {
    return <Navigate to="/login" />;
  }

  if (data?.authorized) {
    return <RoleProvider role={dataRole.role}><Outlet /> </RoleProvider>;
  }

  return <Navigate to="/login" />;
};
export default PrivateLayout;