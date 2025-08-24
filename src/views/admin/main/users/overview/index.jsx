import SearchTableUsers from "./components/SearchTableUsersOverview";
import tableDataUsersOverview from "./variables/tableDataUsersOverview";
import Card from "components/card";

const UserOverview = () => {
  return (
    <Card extra={"w-full h-full mt-3"}>
      <SearchTableUsers tableData={tableDataUsersOverview} />
    </Card>
  );
};

export default UserOverview;
