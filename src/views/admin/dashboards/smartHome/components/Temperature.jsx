import React from "react";
// Assets
import { MdOutlineLocationOn } from "react-icons/md";
import CircularSlider from "react-circular-slider-svg";
import { useState } from "react";
import Card from "components/card";

const Temperature = () => {
  const [temperature, setTemperature] = useState(21);
  return (
    <Card
      extra={
        "flex flex-col w-full h-full relative px-[30px] pb-[40px] pt-[20px] "
      }
    >
      <h4 className="mb-1.5 text-lg font-bold text-navy-700 dark:text-white">
        Temperature Controller
      </h4>
      <div className="flex items-center gap-1">
        <p className="text-gray-600 dark:text-white">
          <MdOutlineLocationOn />
        </p>
        <select
          className="bg-none text-sm font-bold text-gray-600 dark:bg-navy-800 dark:text-white"
          name=""
          id=""
        >
          <option value="dinner room">Dinner Room</option>
          <option value="living loom">Living Room</option>
          <option value="kitchen">Kitchen</option>
        </select>
      </div>
      {/* main */}
      <div className="ml-1 flex h-full w-full flex-col items-center justify-center">
        <div className="relative ml-3 flex h-full w-full items-center justify-center">
          <CircularSlider
            startAngle={45}
            endAngle={315}
            handleSize={6}
            minValue={18}
            maxValue={38}
            size={230}
            arcColor="var(--color-500)"
            arcBackgroundColor="#E1E9F8"
            handle1={{
              value: temperature,
              onChange: (v) => setTemperature(Math.round(v)),
            }}
          />
          <p className="absolute left-[50%] top-[42%] translate-x-[-50%] text-[34px] font-bold text-navy-700 dark:text-white">{`${temperature} °C`}</p>
        </div>

        <div className="z-10 mt-[-50px] flex items-center rounded-xl bg-white py-[20px] px-8 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="mr-[75px] text-lg font-bold text-navy-700 dark:text-white">
            18°C
          </p>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            38°C
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Temperature;
