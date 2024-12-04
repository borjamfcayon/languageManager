import Logo from "../../assets/Logo.webp";
import { Settings } from "lucide-react";
import { Languages } from "../../lib/components/classes/Languages";
import { ClassMates } from "../../lib/components/classMates/ClassMates";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { NextClases } from "../../lib/components/nextClases/NextClases";
export const Home = () => {

    const navigate = useNavigate();

    const role = useRole();

    return (
        <div className="h-screen w-full grid grid-cols-11 grid-rows-12 gap-2">
            <div className="bg-white rounded-md shadow-md col-start-2 col-end-7 row-start-2 row-end-6 grid gap-2">
                <NextClases />
            </div>
            <div className="bg-white rounded-md shadow-md col-start-2 col-end-6 row-start-6 row-end-12 grid gap-2">
                <ClassMates />
            </div>
            <div className="bg-white rounded-md shadow-md col-start-7 col-end-11 row-start-2 row-end-8 grid gap-2">
                <Languages />
            </div>
            <div className="bg-white rounded-md shadow-md col-start-6 col-end-11 row-start-8 row-end-12 grid gap-2">
                <div className="flex flex-col justify-center items-center p-4 gap-2">
                    <h6 className="text-2xl font-bold">Novedades </h6>
                    <p>Mantenimiento...</p>
                </div>
            </div>
            <div className="col-start-6 col-end-7 row-start-6 row-end-8 grid gap-2">
                {role === "admin" ? (
                    <div className="bg-white rounded-md shadow-md flex justify-center items-center p-4 cursor-pointer hover:bg-blue-50" onClick={() => navigate('all')}>
                        <Settings size={60} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center p-4 ">
                        <img src={Logo} alt="Logo" className="w-auto h-full" />
                    </div>
                )}
            </div>
        </div>
    );
};