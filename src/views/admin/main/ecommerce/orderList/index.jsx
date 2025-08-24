import tableDataOrders from "./variables/tableDataOrders";
import SearchTableOrders from "./components/SearchTableOrders";
import Card from "components/card";

const OrderList = () => {
  return (
    <Card extra={"w-full h-full bg-white mt-3"}>
      <SearchTableOrders tableData={tableDataOrders} />
    </Card>
  );
};

export default OrderList;
