import React from "react";
import { MdOutlineHomeWork } from "react-icons/md";
import { MdElectricCar } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Transaction from "components/dataDisplay/Transaction";
function Balance() {
  return (
    <Card extra={"p-4 h-full"}>
      <div
        className={`bg-image relative mt-[7px] flex h-fit w-full justify-between rounded-xl bg-brand-900 bg-ballanceDashboard bg-cover bg-right px-3 py-4 text-white dark:bg-navy-700`}
        bgSize="cover"
      >
        <div>
          <p className="text-sm font-medium">Credit Balance </p>
          <h5 className="text-[34px] !font-bold">$3942.58</h5>
        </div>
        <div className="flex flex-col items-end text-white">
          <CardMenu transparent />
          <div className="mt-3 text-lg">
            <svg
              width="41"
              height="20"
              viewBox="0 0 61 20"
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
      <p className="mt-[19px] text-sm font-medium text-gray-600">Recent</p>

      {/* Bill section */}
      <div className="mt-[1px]">
        <Transaction
          title="Bill & Taxes"
          date="Today, 16:36"
          sum="-$154.50"
          mb="mb-[20px]"
          icon={
            <MdOutlineHomeWork className="text-brand-500 dark:text-white" />
          }
        />

        <Transaction
          title="Car Energy"
          date="23 Jun, 13:06"
          sum="-$40.50"
          mb="mb-[20px]"
          icon={<MdElectricCar className="text-green-500 dark:text-white" />}
        />
        <Transaction
          title="Design Course"
          date="21 Jun, 19:04"
          sum="-$70.00"
          mb="mb-[5px]"
          icon={<GiGraduateCap className="text-yellow-500 dark:text-white" />}
        />
      </div>
    </Card>
  );
}

export default Balance;
