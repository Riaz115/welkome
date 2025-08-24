import Card from "components/card";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { MdOutlineLightbulb, MdOutlineLocationOn } from "react-icons/md";

const Light = () => {
  return (
    <Card extra={"flex flex-col w-full relative pt-4 pb-5 px-6 pb-7 h-full"}>
      <h4 className="ml-px mb-1.5 text-lg font-bold text-navy-700 dark:text-white">
        Light Controller
      </h4>
      <div className="mb-8 flex items-center gap-1">
        <p className="text-gray-600">
          <MdOutlineLocationOn />
        </p>
        <select
          className="bg-none text-sm font-bold text-gray-600 dark:bg-navy-800"
          name=""
          id=""
        >
          <option value="dinner room">Dinner Room</option>
          <option value="living loom">Living Room</option>
          <option value="kitchen">Kitchen</option>
        </select>
      </div>
      {/* Main */}
      <div className="flex h-fit w-full flex-col items-center bg-white dark:!bg-navy-800">
        <div className="mb-4 flex h-[90px] w-[90px] items-center justify-center rounded-full text-[50px] text-brand-500 shadow-xl shadow-shadow-500 dark:bg-navy-700 dark:text-white dark:shadow-none">
          <MdOutlineLightbulb />
        </div>
        <p className="mb-2 font-medium text-gray-600">Your program</p>
        <p className="mb-4 text-center text-lg font-bold text-navy-700 dark:text-white">
          Between 12:00AM and 07:00AM
        </p>
        <div className="mt-3 w-full px-3">
          <Slider
            range
            count={1}
            defaultValue={[0, 20]}
            trackStyle={{
              backgroundColor: "var(--color-500)",
              height: 10,
              cursor: "pointer",
            }}
            handleStyle={{
              border: "3px solid white",
              backgroundColor: "var(--color-500)",
              opacity: 1,
              height: 18,
              cursor: "pointer",
              width: 18,
            }}
            railStyle={{
              backgroundColor: "#E1E9F8",
              height: 10,
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default Light;
