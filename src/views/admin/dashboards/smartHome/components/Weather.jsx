import Card from "components/card";
import { MdOutlineLocationOn, MdOutlineWbSunny } from "react-icons/md";

const Weather = () => {
  return (
    <Card extra={"flex flex-col w-full h-full relative p-4"}>
      {/* Header */}
      <p className="mt-[2px] ml-px text-lg font-bold leading-none text-navy-700 dark:text-white">
        Friday, 25 June
      </p>
      <div className="mt-[10px] flex items-center gap-1">
        <p className="text-gray-600">
          <MdOutlineLocationOn />
        </p>
        <p className="bg-none text-sm font-bold text-gray-600 dark:bg-navy-800">
          New York, USA
        </p>
      </div>
      {/* main */}
      <div className="flex h-full w-full flex-col">
        <div className="mt-9 flex h-fit w-full justify-between rounded-[20px] bg-gradient-to-b from-lightPrimary to-white px-[14px] py-3 dark:!bg-gradient-to-b dark:from-navy-900 dark:to-navy-800">
          {/* sun logo */}
          <div>
            <p className="text-[58px] text-brand-500 dark:text-white">
              <MdOutlineWbSunny />
            </p>
            <h5 className="mt-[20px] text-[40px] font-bold text-navy-700 dark:text-white">
              25°C
            </h5>
            <h5 className="text-base font-medium text-navy-700 dark:text-white">
              Sunny
            </h5>
          </div>

          {/* right section */}
          <p className="mt-1 mr-4 text-sm font-medium text-navy-700 dark:text-white">
            H:28° L:17°
          </p>
        </div>
        {/* button */}
        <button className="ml-auto mt-[5px] rounded-full bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          View more
        </button>
      </div>
    </Card>
  );
};

export default Weather;
