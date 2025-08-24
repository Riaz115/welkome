import { useState } from "react";

const Filter = () => {
  const [active, setActive] = useState("Popular");
  return (
    <div className="mt-9 flex h-[60px] w-full justify-between pl-[19px] pt-[18px]">
      <h4 className="text-xl font-semibold text-navy-700 dark:text-white">
        Feeds
      </h4>
      <div className="flex justify-between">
        <button
          onClick={() => setActive("Latest")}
          className={`linear flex items-center justify-center rounded-full border px-4 py-1.5 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-50 dark:border-none dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20 md:mr-[20px] ${
            active === "Latest"
              ? "border-gray-600 dark:!border-none dark:bg-white/5"
              : "!border-none"
          } `}
        >
          Latest
        </button>

        <button
          onClick={() => setActive("Popular")}
          className={`linear flex items-center justify-center rounded-full border px-4 py-1.5 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-50 dark:border-none dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20 md:mr-[20px] ${
            active === "Popular"
              ? "border-gray-200 dark:!border-none dark:bg-white/5"
              : "!border-none"
          } `}
        >
          Popular
        </button>
      </div>
    </div>
  );
};

export default Filter;
