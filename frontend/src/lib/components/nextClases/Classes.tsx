import { useGetNextClasses } from "../../api/ClassApi";
import { Loading } from "../Loading";

interface NextClass {
    name: string;
    imgUrl: string;
    day: string;
    hour: number;
}

const days = [
    { day: "monday", name: "Lunes" },
    { day: "tuesday", name: "Martes" },
    { day: "wednesday", name: "Miércoles" },
    { day: "thursday", name: "Jueves" },
    { day: "friday", name: "Viernes" },
    { day: "saturday", name: "Sábado" },
    { day: "sunday", name: "Domingo" }
];


export const Classes = ({ classes }: { classes: string[] }) => {
    const { data, isLoading, error } = useGetNextClasses(classes);
    console.log("Classes - data:", data)

    if (isLoading) return <Loading />;

    if (error) {
        return <p>Error: {error.toString()}</p>;
    }


    return (
        <div className="grid grid-cols-4">
            {data?.map((c: NextClass, i: number) => (
                i < 4 && (
                    <div key={i} className="flex flex-col justify-center items-center p-4 gap-1">
                        <img
                            className="rounded aspect-video filter"
                            src={c.imgUrl}
                            alt={c.name}
                        />
                        <p>{
                            days.find((d) => d.day === c.day)?.name
                        }</p>
                        <p>{`Hora: ${c.hour}:00`}</p>
                    </div>
                )
            ))}
        </div>
    );
};
