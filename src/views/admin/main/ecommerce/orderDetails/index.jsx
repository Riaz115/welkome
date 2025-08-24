import Details from "./components/Details";
import OrderStatus from "./components/OrderStatus";
import Receipt from "./components/Receipt";

const OrderDetails = () => {
  return (
    <div className="gap-[20px] mt-3 grid h-full w-full grid-cols-7 rounded-[20px]">
      <div className="z-0 col-span-7 lg:col-span-5">
        <Receipt />
      </div>

      <div className="z-0 col-span-7 lg:col-span-2">
        <OrderStatus />
      </div>
      <div className="z-0 col-span-7 lg:col-span-7">
        <Details />
      </div>
    </div>
  );
};

export default OrderDetails;
