import { useEffect } from "react";
import { IUser, useGetAllUsersByIds } from "../../api/UserApi";

export const SecondClassUsers = ({ currentUsersIds }: { currentUsersIds: string[] | null | undefined }) => {
    const validUsersIds = currentUsersIds ?? [];

    const {
        data: students,
        isLoading: loadingStudents,
        refetch: refetchStudents,
    } = useGetAllUsersByIds(validUsersIds);

    useEffect(() => {
        if (validUsersIds.length > 0) {
            refetchStudents();
        }
    }, [validUsersIds, refetchStudents]);

    if (loadingStudents) {
        return <div>Loading...</div>;
    }

    if (!students || students.length === 0) {
        return <div>No students found</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {students.map((student: IUser) => (
                <div key={student._id} className="flex gap-2 items-center">
                    <h6 className="text-md ">- {student.name}</h6>
                </div>
            ))}
        </div>
    );
};
