import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useVerifyToken } from "../../lib/api/AuthApi";

const PrivateLayout = () => {
  const { isLoading, data } = useVerifyToken(localStorage.getItem("token") || "");

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center text-blue-600 animate-spin"><Loader2 size={100} /></div>
    );

  }

  if (data?.authorized) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default PrivateLayout;