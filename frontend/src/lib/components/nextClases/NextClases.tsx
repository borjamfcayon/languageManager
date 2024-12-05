import { useGetUserInfo } from "../../api/UserApi";
import { Loading } from "../Loading";
import { Classes } from "./Classes";

export const NextClases = () => {
    const { data, isLoading, error } = useGetUserInfo();


    if (isLoading) return <Loading />;

    if (error) {
        return <p>Error: {error.toString()}</p>;
    }
    return (
        <div className="flex flex-col justify-center items-center p-4 gap-2">
            <h6 className="text-2xl font-bold">Próximas Clases</h6>
            <Classes classes={data?.class || []} />
        </div>
    );
}