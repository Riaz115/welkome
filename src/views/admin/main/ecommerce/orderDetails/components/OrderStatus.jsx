import Card from "components/card";
import OrderStep from "components/dataDisplay/OrderStep";
import {
  MdPointOfSale,
  MdShoppingBasket,
  MdArchive,
  MdLocalShipping,
  MdCheckCircle,
} from "react-icons/md";
import { MdCheck, MdTimer } from "react-icons/md";

const OrderStatus = () => {
  return (
    <Card extra={"w-full h-full p-4"}>
      {/* Order Status */}
      <h4 className="mt-1 text-lg font-semibold text-navy-700 dark:text-white">
        Order Status
      </h4>

      {/* ordersteps */}

      <div className="relative h-full w-full">
        <div
          className={`absolute left-[32px] mt-20 text-brand-500 dark:text-white`}
        >
          <svg
            width="2"
            height="130"
            viewBox="0 0 2 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="63"
              x2="0.999997"
              y2="1"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="6 6"
            />
          </svg>
        </div>

        {/* steps */}
        <div className="font-dm font-medium">
          <div>
            <OrderStep
              title="Order Placed"
              subtitle="27 Jul 2022"
              bg="bg-white dark:!bg-navy-800"
              icon2={<MdCheck />}
              icon={<MdPointOfSale />}
              border="border-2 border-green-500"
            />
          </div>
          <div className="mt-9">
            <OrderStep
              title="Products Picked"
              subtitle="27 Jul 2022"
              bg="bg-white dark:!bg-navy-800"
              icon2={<MdCheck />}
              icon={<MdShoppingBasket />}
              border="border-2 border-green-500"
            />
          </div>
          <div className={`absolute left-[32px] text-brand-500`}>
            <svg
              width="2"
              height="80"
              viewBox="0 0 2 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="63"
                x2="0.999997"
                y2="1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="6 6"
              />
            </svg>
          </div>
          <div className="mt-10">
            <OrderStep
              title="Order Packed"
              subtitle="27 Jul 2022"
              bg="bg-white dark:!bg-navy-800"
              icon2={<MdCheck />}
              icon={<MdArchive />}
              border="border-2 border-green-500"
            />
          </div>
          <div
            className={`absolute left-[32px] text-brand-500 dark:text-white`}
          >
            <svg
              width="2"
              height="80"
              viewBox="0 0 2 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="63"
                x2="0.999997"
                y2="1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="6 6"
              />
            </svg>
          </div>
          <div className="mt-10">
            <OrderStep
              title="Shipped"
              subtitle="27 Jul 2022"
              bg="bg-white dark:!bg-navy-800"
              icon2={<MdCheck />}
              icon={<MdLocalShipping />}
              border="border-2 border-green-500"
            />
          </div>
          <div className={`absolute left-[32px] text-brand-500`}>
            <svg
              width="2"
              height="80"
              viewBox="0 0 2 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="63"
                x2="0.999997"
                y2="1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="6 6"
              />
            </svg>
          </div>
          <div className="mt-10">
            <OrderStep
              title="Delivered"
              bg="dark:!bg-gradient-to-b from-[#0B1330] dark:!shadow-none to-[#111C44] bg-lightPrimary text-gray-600 shadow-inset shadow-shadow-500"
              variant="last"
              icon2={<MdTimer className="text-4xl text-gray-600" />}
              icon={<MdCheckCircle className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderStatus;
