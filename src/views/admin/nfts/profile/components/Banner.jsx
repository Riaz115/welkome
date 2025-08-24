import {
  MdOutlineCollections,
  MdFormatPaint,
  MdAccessTime,
  MdOutlineLocalOffer,
} from "react-icons/md";

import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { MdVerified, MdOutlineContentCopy } from "react-icons/md";

const Banner = (props) => {
  const { image, address, name, wallet, date, profile } = props;
  let newWallet = wallet.slice(0, 4);
  newWallet = newWallet.concat("...");
  newWallet = newWallet.concat(wallet.slice(wallet.length - 4, wallet.length));

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="flex h-full w-full flex-col items-center rounded-[20px]">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="relative flex h-[150px] w-full justify-center rounded-[20px] bg-cover bg-no-repeat xl:h-[220px]"
      >
        <div className="absolute -bottom-[70px] flex h-[180px] w-[180px] items-center justify-center rounded-full border-[9px] border-white bg-white dark:!border-navy-900 xl:h-[165px] xl:w-[165px]">
          <img src={profile} className="h-full w-full rounded-full" alt="" />
        </div>
      </div>

      <div className="mt-[90px] flex flex-col items-center">
        <div className="flex items-center gap-2">
          <p className="text-[35px] font-semibold text-navy-700 dark:text-white xl:text-[54px]">
            {" "}
            {name}{" "}
          </p>
          <p className="mt-3 text-3xl text-[#3965FF]">
            <MdVerified />
          </p>
        </div>
        <div className="mt-[20px] flex cursor-pointer items-center gap-1 text-center text-gray-600">
          <p
            onClick={function () {
              navigator.clipboard.writeText(wallet);
              alert("addres coppied");
            }}
          >
            {newWallet}
          </p>
          <p className="">
            <MdOutlineContentCopy />
          </p>
        </div>

        <p className="mt-3 text-center text-lg font-medium text-[#3965FF] dark:text-white">
          {" "}
          {address}{" "}
        </p>
        <p className="mt-3 text-center text-lg font-medium text-navy-700 dark:text-white">
          {" "}
          {date}{" "}
        </p>
      </div>

      {/* tabs */}
      <div className="flex h-full w-full flex-col items-center overflow-x-scroll px-4 pt-[45px] lg:overflow-x-hidden lg:px-10">
        <div className="mt-[44px] flex w-full justify-between gap-16 overflow-hidden border-b-2 border-gray-200 text-3xl dark:!border-white/10 lg:gap-[50px] xl:justify-center xl:gap-[100px]">
          <div
            className={
              toggleState === 1
                ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 pb-[20px] hover:cursor-pointer"
            }
            onClick={() => toggleTab(1)}
          >
            <p className="text-lg text-navy-700 dark:text-white">
              <MdOutlineCollections />
            </p>
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Collected
            </p>
            <p className="text-lg text-gray-600">0</p>
          </div>

          <div
            className={
              toggleState === 2
                ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 pb-[20px] hover:cursor-pointer"
            }
            onClick={() => toggleTab(2)}
          >
            <p className="text-lg text-navy-700 dark:text-white">
              <MdFormatPaint />
            </p>
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Created
            </p>
            <p className="text-lg text-gray-600">4</p>
          </div>

          <div
            className={
              toggleState === 3
                ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 pb-[20px] hover:cursor-pointer"
            }
            onClick={() => toggleTab(3)}
          >
            <p className="text-lg text-navy-700 dark:text-white">
              <IoMdHeartEmpty />
            </p>
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Favorite
            </p>
            <p className="text-lg text-gray-600">12</p>
          </div>

          <div
            className={
              toggleState === 4
                ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 pb-[20px] hover:cursor-pointer"
            }
            onClick={() => toggleTab(4)}
          >
            <p className="text-lg text-navy-700 dark:text-white">
              <MdAccessTime />
            </p>
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Activity
            </p>
            <p className="text-lg text-gray-600">0</p>
          </div>

          <div
            className={
              toggleState === 5
                ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 pb-[20px] hover:cursor-pointer"
            }
            onClick={() => toggleTab(5)}
          >
            <p className="text-lg text-navy-700 dark:text-white">
              <MdOutlineLocalOffer />
            </p>
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Offers
            </p>
            <p className="text-lg text-gray-600">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
