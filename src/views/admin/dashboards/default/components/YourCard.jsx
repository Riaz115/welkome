import Card from "components/card";
import MasterCard from "components/card/MasterCard";
import Transaction from "components/dataDisplay/Transaction";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
//assets
import {
  MdOutlineShoppingBasket,
  MdOutlineDirectionsBus,
  MdOutlineSubscriptions,
  MdLocalBar,
  MdOutlineWeekend,
  MdCached,
  MdAdd,
  MdAttachMoney,
  MdMoreHoriz,
} from "react-icons/md";
import { RiNetflixFill } from "react-icons/ri";

function YourCard(props) {
  return (
    <Card extra={"w-full h-fit 3xl:h-full px-3 pt-3 2xl:pb-5"}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Your Card
        </h4>
        <button className="flex items-center justify-center rounded-lg bg-lightPrimary p-2 transition duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-white/20 dark:active:bg-white/10">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white dark:bg-white dark:!text-navy-900">
            <AiOutlinePlus />
          </div>
        </button>
      </div>
      {/* MasterCard */}
      <div className="mt-[25px] px-[5px] md:px-40 xl:px-1">
        <MasterCard number="1275 XXXX XXXX XXXX" CCV="12X" expDate="02/23" />
      </div>

      {/* Card bellow info */}
      <div className="mt-11 w-full rounded-xl bg-lightPrimary px-3 py-3 dark:bg-navy-700">
        <h5 className="text-sm font-bold text-navy-700 dark:text-white">
          Use for added security online
        </h5>
        <p className="text-sm font-medium text-gray-600">
          The card number is refreshed automatically after each use. Each number
          cand be used only once.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex w-full justify-between px-3 md:justify-around xl:justify-between">
        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-brand-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
            <MdCached />
          </button>
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
            Transfer
          </h5>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-yellow-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
            <MdAdd />
          </button>
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
            Top Up
          </h5>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-green-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
            <MdAttachMoney />
          </button>
          <h5 className="mt-2 text-sm font-medium text-navy-700 dark:text-white">
            Pay Bills
          </h5>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button className="flex items-center justify-center rounded-full bg-white p-3 text-2xl text-yellow-500 shadow-2xl transition duration-200 hover:cursor-pointer hover:!bg-gray-50 active:!bg-gray-100 dark:!bg-navy-700 dark:text-white dark:hover:!bg-white/20 dark:active:!bg-white/10">
            <MdMoreHoriz />
          </button>
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
            More
          </h5>
        </div>
      </div>
      {/* Transactions */}
      <h5 className="mt-[42px] ml-2 text-lg font-bold text-navy-700 dark:text-white">
        Your transactions
      </h5>

      <div className="mt-9">
        <Transaction
          title="Public Transport"
          date="22 September 2022"
          sum="-$15.50"
          mb="mb-[20px]"
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
          mb="mb-[20px]"
          icon={<MdLocalBar className="text-brand-500 dark:text-white" />}
        />

        <Transaction
          title="Drink Store"
          date="09 September 2022"
          sum="-$5.21"
          mb="mb-[20px]"
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
}

export default YourCard;
