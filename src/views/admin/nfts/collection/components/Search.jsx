import { MdDashboard, MdApps } from "react-icons/md";
import SearchIcon from "components/icons/SearchIcon";
const Search = () => {
  return (
    <div className="mx-auto mt-5 flex w-full gap-1 overflow-hidden md:!gap-6 xl:w-[96%]">
      <div className="flex h-[45px] w-full rounded-xl border !border-gray-200 dark:!border-none dark:!bg-navy-700 md:w-[870px] xl:w-full">
        <SearchIcon className="dark:text-white" />
        <input
          placeholder="Search..."
          className="!w-full rounded-xl text-sm font-medium outline-none dark:bg-navy-700 dark:text-white sm:w-[50px] xl:!w-full"
          type="text"
        />
      </div>
      <div className="w-full rounded-xl border !border-gray-200 px-3 text-sm font-medium text-gray-600 outline-none dark:!border-none dark:bg-navy-700 sm:w-full md:w-fit">
        <select
          className="h-[45px] w-full rounded-xl text-sm font-medium text-gray-600 outline-none dark:bg-navy-700 md:w-fit md:pr-8 xl:pr-20"
          name=""
          id=""
        >
          <option value="single">Single Items</option>
          <option value="multiple">Multiple Items</option>
        </select>
      </div>
      <div className="w-full rounded-xl border !border-gray-200 px-3 text-sm font-medium text-gray-600 outline-none dark:!border-none dark:bg-navy-700 md:w-fit">
        <select
          className="h-[45px] w-full rounded-xl text-sm font-medium text-gray-600 outline-none dark:bg-navy-700 md:w-fit md:pr-8 xl:pr-20"
          name=""
          id=""
        >
          <option value="single">Low to High</option>
          <option value="multiple">High to Low</option>
        </select>
      </div>
      <button className="flex items-center justify-center rounded-xl border !border-gray-200 p-3 text-navy-700 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-50 dark:!border-none dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
        <MdDashboard />
      </button>
      <button className="flex items-center justify-center rounded-xl border !border-gray-200 p-3 text-navy-700 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-50 dark:!border-none dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
        <MdApps />
      </button>
    </div>
  );
};

export default Search;
