import Card from "components/card";
import Transaction from "components/dataDisplay/Transaction";
import {
  MdOutlineShoppingBasket,
  MdOutlineDirectionsBus,
  MdOutlineSubscriptions,
  MdLocalBar,
  MdOutlineWeekend,
} from "react-icons/md";
import { RiNetflixFill } from "react-icons/ri";

const YourTransaction = () => {
  return (
    <Card extra={"w-full h-full p-3"}>
      <h4 className="mt-[20px] ml-[15px] text-lg font-bold text-navy-700 dark:text-white">
        Your transactions
      </h4>

      <div className="mt-[26px] px-3">
        <Transaction
          title="Public Transport"
          date="22 September 2022"
          sum="-$15.50"
          mb="mb-[30px]"
          icon={
            <MdOutlineDirectionsBus className="text-brand-500 dark:text-white" />
          }
        />

        <Transaction
          title="Grocery Store"
          date="18 September 2022"
          sum="-$42.28"
          mb="mb-[30px]"
          icon={
            <MdOutlineShoppingBasket className="text-green-500 dark:text-white" />
          }
        />

        <Transaction
          title="Public Transport"
          date="15 September 2022"
          sum="-$11.37"
          mb="mb-[30px]"
          icon={
            <MdOutlineSubscriptions className="text-yellow-500 dark:text-white" />
          }
        />

        <Transaction
          title="Netflix"
          date="12 September 2022"
          sum="-$34.90"
          mb="mb-[30px]"
          icon={<RiNetflixFill className="text-red-500 dark:text-white" />}
        />

        <Transaction
          title="Drink Store"
          date="09 September 2022"
          sum="-$5.21"
          mb="mb-[30px]"
          icon={<MdLocalBar className="text-brand-500 dark:text-white" />}
        />

        <Transaction
          title="Drink Store"
          date="09 September 2022"
          sum="-$5.21"
          mb="mb-[30px]"
          icon={<MdLocalBar className="text-brand-500 dark:text-white" />}
        />

        <Transaction
          title="Apartment Debt"
          date="05 September 2022"
          sum="-$314.90"
          mb="mb-[30px]"
          icon={<MdOutlineWeekend className="text-green-500 dark:text-white" />}
        />
      </div>
    </Card>
  );
};

export default YourTransaction;
