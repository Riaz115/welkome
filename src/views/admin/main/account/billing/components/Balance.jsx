import React from "react";
import CardMenu from "components/card/CardMenu";
import {
  MdOutlineShoppingBasket,
  MdOutlineDirectionsBus,
} from "react-icons/md";

import Transaction from "components/dataDisplay/Transaction";
import Card from "components/card";
function Balance() {
  return (
    <Card extra={"px-4 py-6 w-full"}>
      <div className="bg-image relative mt-[7px] flex h-fit w-full justify-between rounded-xl bg-brand-900 bg-ballanceDashboard bg-cover bg-right px-3 py-4 text-white dark:bg-navy-700">
        <di>
          <p className="text-sm font-medium">Overall Revenue </p>
          <h4 className="text-3xl font-bold">$3942.58</h4>
        </di>
        <div className="flex flex-col items-end text-white">
          <CardMenu transparent />
          <div className="mt-5">
            <svg
              width="68"
              height="20"
              viewBox="0 0 68 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.2C1.70238 11.8 4.5 18.5 11 18C17.5 17.5 18.2786 1 29.6571 1C41.0357 1 41.0357 20.0286 60 3.57143"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <h5 className="mt-5 text-sm font-medium text-gray-600">Recent</h5>

      {/* Bill section */}
      <div className="">
        <Transaction
          title="Bill & Taxes"
          date="Today, 16:36"
          sum="-$154.50"
          mb="mb-5"
          icon={
            <MdOutlineDirectionsBus className="text-brand-500 dark:text-white" />
          }
        />

        <Transaction
          title="Car Energy"
          date="23 Jun, 13:06"
          sum="-$42.28"
          icon={
            <MdOutlineShoppingBasket className="text-green-500 dark:text-white" />
          }
        />
      </div>
    </Card>
  );
}

export default Balance;
