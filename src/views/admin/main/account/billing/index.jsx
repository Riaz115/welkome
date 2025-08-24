import Balance from "./components/Balance";
import Invoice from "./components/Invoice";
import Market from "./components/Market";
import PaymentMethod from "./components/PaymentMethod";
import YourCard from "./components/YourCard";
import YourTransaction from "./components/YourTransaction";
import YourTransfers from "./components/YourTransfer";

const Billing = () => {
  return (
    <div className="mt-3 w-full">
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <YourCard />
        <div className="h-full w-full rounded-[20px]">
          <Balance />
          <PaymentMethod />
        </div>
        <Invoice />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div>
          <YourTransaction />
        </div>
        <div>
          <Market />
        </div>
        <div>
          <YourTransfers />
        </div>
      </div>
    </div>
  );
};

export default Billing;
