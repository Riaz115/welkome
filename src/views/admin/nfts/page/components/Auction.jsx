// Assets
import { IoMdTrendingUp } from "react-icons/io";
import { MdVerified, MdOutlineMonetizationOn } from "react-icons/md";

const Auction = (props) => {
  const { name, price, creator, creatorAvatar, bid } = props;
  return (
    <div className="flex h-full w-full flex-col items-center rounded-[20px] px-[1px] pt-[3px] dark:bg-navy-900 sm:px-[150px] lg:px-[0px] xl:px-[35px]">
      <h1 className="mx-auto mt-14 text-[35px] font-bold text-navy-700 dark:text-white md:px-[10px] lg:text-[30px] xl:text-[53px]">
        {name}
      </h1>
      {/* */}
      <div className="mt-9 flex w-full flex-row items-center justify-between md:pl-4">
        <div className="flex items-center justify-between gap-2 rounded-[20px] md:!gap-[12px] md:px-2">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full md:h-[60px] md:w-[60px]">
            <img
              src={creatorAvatar}
              className="h-full w-full rounded-full"
              alt=""
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 md:text-base">
              Creator
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-navy-700 dark:text-white md:text-lg">
              <p>{creator}</p>

              <p className="text-sm text-brand-500 md:text-base">
                <MdVerified />
              </p>
            </div>
          </div>
        </div>

        {/* monetization */}
        <div className="flex items-center justify-between gap-2 rounded-[20px] px-2 md:!gap-[12px]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-[40px] text-white md:h-[60px] md:w-[60px]">
            <MdOutlineMonetizationOn />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 md:text-base">
              Instant price
            </p>
            <div className="flex items-center justify-center gap-1 text-sm font-semibold text-navy-700 dark:text-white md:gap-2 md:text-lg">
              <p> {price} </p>

              <p className="text-sm text-green-500 md:text-xl">
                <IoMdTrendingUp />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* curret bide */}
      <div className="flex h-full w-full flex-col xl:px-3">
        <div className="mt-14 flex h-[450px] w-full flex-col items-center rounded-[20px] border border-gray-200 pt-10 shadow-xl shadow-gray-100 dark:!border-none dark:bg-navy-800 dark:shadow-none md:h-[515px]">
          <h4 className="mt-4 text-[22px] font-medium text-navy-700 dark:text-white">
            Current Bid
          </h4>
          <h1 className="mt-2 text-[45px] font-bold text-navy-700 dark:text-white md:text-[60px]">
            {" "}
            {bid}{" "}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <h3 className="text-2xl font-bold text-gray-600"> $10.927,84 </h3>
            <p className="text-2xl text-green-500">
              <IoMdTrendingUp />
            </p>
          </div>
          <h5 className="mt-[58px] text-xl font-medium text-navy-700 dark:text-white md:mt-[85px]">
            Auction ends in
          </h5>

          <div className="mt-7 flex gap-14 md:mt-10">
            <div className="flex flex-col items-center">
              <h3 className="text-[35px] font-bold text-navy-700 dark:text-white md:text-[42px]">
                20
              </h3>
              <p className="mt-1 text-2xl text-gray-600">Hrs</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-[35px] font-bold text-navy-700 dark:text-white md:text-[42px]">
                37
              </h3>
              <p className="mt-1 text-2xl text-gray-600">Mins</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-[35px] font-bold text-navy-700 dark:text-white md:text-[42px]">
                49
              </h3>
              <p className="mt-1 text-2xl text-gray-600">Secs</p>
            </div>
          </div>
        </div>

        <button className="px-full linear mt-5 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Place a bid
        </button>
      </div>
    </div>
  );
};

export default Auction;
