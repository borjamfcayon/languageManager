import { useMemo } from "react";
import { IUser } from "../../api/UserApi";
import { Loading } from "../Loading";
import { useGetAllClassByIds } from "../../api/ClassApi";
import { SecondClassUsers } from "./SecondClassUsers";

export const ClassUsers = ({
  page,
  userInfo,
}: {
  page: number;
  userInfo?: IUser;
}) => {
  const { data: classes, isLoading: loadingClasses } = useGetAllClassByIds(
    userInfo?.class ?? []
  );

  const currentUsersIds = useMemo(() => {
    if (!classes || !Array.isArray(classes) || !classes[page]) {
      return null;
    }
    return classes[page].students ?? null;
  }, [classes, page]);

  if (loadingClasses) {
    return <Loading />;
  }

  if (!userInfo?.class?.length || userInfo?.class?.[0] === "") {
    return <div>No classes found</div>;
  }

  return (
    <div>
      {classes[page] && (
        <p className="text-lg font-bold">{classes[page].language} </p>
      )}
      <SecondClassUsers currentUsersIds={currentUsersIds} />
    </div>
  );
};
