import { MdStar, MdStarHalf } from "react-icons/md";
import Accordian from "./Accordian";

const ProductInfo = () => {
  return (
    <div className="h-full w-full rounded-xl bg-white px-2 py-3 dark:!bg-navy-800 xl:!pl-10 xl:!pr-4">
      <h1 className="pt-[10px] text-[28px] font-semibold text-navy-700 dark:text-white md:text-[30px]">
        ZOE™️ Elegant Chair
      </h1>
      <div className="mt-[13px] flex items-center gap-[2px]">
        <p className="text-2xl text-yellow-400">
          <MdStar />
        </p>
        <p className="text-2xl text-yellow-400">
          <MdStar />
        </p>
        <p className="text-2xl text-yellow-400">
          <MdStar />
        </p>
        <p className="text-2xl text-yellow-400">
          <MdStar />
        </p>
        <p className="text-2xl text-yellow-400">
          <MdStarHalf />
        </p>
        <p className="ml-1 text-lg font-medium text-navy-700 dark:text-white">
          28
        </p>
      </div>
      <p className="mt-[28px] text-[15px] text-navy-700  dark:text-white">
        Just consists of a shell made of molded ash or oak veneer and a steel or
        chrome frame. The frame is mounted to the seat by slotting seamlessly
        into the millings underneath the shell. The chairs are stackable, up to
        6 pcs. The chair is delivered assembled.
      </p>

      <div className="mt-[30px] lg:mt-[38px]">
        <p className="text-lg font-medium text-gray-600 line-through">
          $590.00
        </p>
        <div className="flex items-center gap-2">
          <h2 className="mt-[3px] text-[38px] font-bold text-navy-700 dark:text-white">
            $2,599.00
          </h2>
          <div className="flex w-[95px] items-center justify-center rounded-lg bg-green-100 py-2 text-xs font-bold text-green-500 dark:bg-green-50">
            IN STOCK
          </div>
        </div>
      </div>
      {/* select */}
      <div className="mt-[42px] grid w-full grid-cols-1 gap-4 lg:grid-cols-2 3xl:w-5/6">
        <div className="w-full">
          <div>
            <label
              htmlFor="color"
              className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white"
            >
              Color
            </label>
            <div className="w-full rounded-xl border border-gray-200 py-3 pr-3 pl-2.5 text-sm font-normal text-gray-600 outline-none dark:!border-white/10 dark:!bg-navy-800 dark:text-white sm:w-full md:w-full">
              <select
                className="text-lightFourth w-full rounded-xl pr-4 text-sm outline-none dark:!bg-navy-800 dark:text-white"
                name=""
                id="color"
              >
                <option value="usd">Dark Grey</option>
                <option value="usd">Black</option>
                <option value="usd">White</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div>
            <label
              htmlFor="quantity"
              className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white"
            >
              Quantity
            </label>
            <div className="w-full rounded-xl border border-gray-200 py-3 pr-3 pl-2.5 text-sm font-normal text-gray-600 outline-none dark:!border-white/10 sm:w-full md:w-full">
              <select
                className="text-lightFourth w-full rounded-xl pr-4 text-sm outline-none dark:!bg-navy-800 dark:text-white"
                name=""
                id="quantity"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </div>
        {/* button */}
      </div>
      <button className="mt-[34px] flex w-full items-center justify-center rounded-xl bg-brand-500 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 3xl:w-5/6">
        Add to cart
      </button>
      {/* accordians */}
      <div>
        <Accordian />
      </div>
    </div>
  );
};

export default ProductInfo;
