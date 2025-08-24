import React from "react";
function MiniStatistics(props) {
  const { name, value, icon, iconBg } = props;
  return (
    <div className="flex w-full items-center gap-3 rounded-[20px] bg-white bg-clip-border px-[18px] py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
      <div
        className={`flex h-[56px] w-14 items-center justify-center rounded-full text-[33px] text-brand-500 dark:!bg-navy-700 dark:text-white ${iconBg} `}
      >
        {icon}
      </div>
      <div className="">
        <p className=" mb-1 text-sm font-medium text-gray-600">{name}</p>
        <h3 className="text-xl font-bold leading-6 text-navy-700 dark:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default MiniStatistics;
