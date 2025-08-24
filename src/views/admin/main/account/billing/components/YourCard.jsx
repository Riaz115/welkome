import Card from "components/card";
import MasterCard from "components/card/MasterCard";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
//assets
import { MdCached, MdAdd, MdAttachMoney, MdMoreHoriz } from "react-icons/md";

function YourCard() {
  return (
    <Card extra={"w-full h-full px-[34px] py-4 xl:py-2"}>
      {/* Header */}
      <div className="flex items-center justify-between px-1 xl:pt-2">
        <h4 className="font-dm text-lg font-bold text-navy-700 dark:text-white">
          Your Card
        </h4>
        <button className="flex items-center justify-center rounded-lg bg-lightPrimary !p-2 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:bg-white/20 dark:active:bg-white/10">
          <div className="flex items-center justify-center rounded-full bg-brand-500 text-white dark:bg-white dark:!text-brand-500">
            <AiOutlinePlus />
          </div>
        </button>
      </div>
      {/* Master Card */}
      <div className="mt-[26px]">
        <MasterCard number="1275 XXXX XXXX XXXX" CCV="12X" expDate="02/23" />
      </div>

      {/* Card bellow info */}
      <div className="mt-12 w-full rounded-xl bg-lightPrimary px-4 py-3 dark:bg-navy-700">
        <h5 className="text-sm font-bold leading-5 text-navy-700 dark:text-white">
          Use for added security online
        </h5>
        <p className="pr-2 text-sm font-normal leading-5 text-gray-600">
          The card number is refreshed automatically after each use. Each number
          cand be used only once.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex w-full justify-between xl:gap-1 2xl:gap-8">
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
          <h5 className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
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
    </Card>
  );
}

export default YourCard;
