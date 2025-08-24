import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function SolidSubtleMultiAlert(props) {
  const {
    icon,
    title,
    description,
    bg,
    justify,
    mb,
    closeBg,
    solid,
    iconColor,
  } = props;

  return (
    <div
      className={`flex justify-between ${mb} h-[72px] w-full items-center py-[6px] pl-[17px] pr-[6px] ${bg} rounded-lg`}
    >
      <div className={`flex h-full w-full gap-2 pt-[6px] ${justify} `}>
        <p className={`text-2xl ${iconColor} `}> {icon} </p>
        <div>
          <h5
            className={`pb-[3px] font-bold dark:text-navy-900 ${
              solid
                ? "text-white dark:!text-navy-900"
                : "text-navy-700 dark:!text-white"
            } `}
          >
            {title}
          </h5>
          <p
            className={`font-base pr-[5px] ${
              solid
                ? "text-white dark:!text-navy-900"
                : "text-navy-700 dark:!text-white"
            } `}
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className={`mb-[26px] flex h-9 w-9 cursor-pointer items-center ${closeBg} justify-center rounded-md text-xl font-bold`}
      >
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default SolidSubtleMultiAlert;
