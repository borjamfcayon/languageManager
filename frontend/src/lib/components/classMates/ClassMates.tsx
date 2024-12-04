import React from "react";
import { useGetUserInfo } from "../../api/UserApi";
import { Loading } from "../Loading";
import { Button } from "@mui/material";
import { ClassUsers } from "./ClassUsers";

export const ClassMates = () => {
    const [page, setPage] = React.useState(0);

    const { data: userInfo, isLoading } = useGetUserInfo();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2 p-12 overflow-y-auto overflow-x-hidden">
            <h6 className="text-2xl font-bold">Compañeros de clase </h6>
            <ClassUsers page={page} userInfo={userInfo} />
            {userInfo?.class && userInfo.class.length > 1 && (
                <div className="flex gap-2">
                    <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
                        Anterior
                    </Button>
                    <Button onClick={() => setPage((prev) => prev + 1)} disabled={page === userInfo?.class.length - 1}>
                        Siguiente
                    </Button>
                </div>
            )
            }
        </div>
    );
}