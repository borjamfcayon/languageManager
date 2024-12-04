import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

const AdminLayout = () => {
    const role = useRole();

    if (role === "admin") {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};
export default AdminLayout;