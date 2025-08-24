import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function SolidSubtleAlert(props) {
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
      className={`flex justify-between ${mb} h-[48px] w-full items-center py-[6px] pl-[17px] pr-[6px] ${bg} rounded-lg`}
    >
      <div className={`flex h-full w-full items-center gap-2 ${justify} `}>
        <p className={`text-2xl ${iconColor} `}> {icon} </p>
        <h5
          className={`pb-[3px] text-base ${
            solid
              ? "text-white dark:!text-navy-900"
              : "text-navy-700 dark:!text-white"
          } `}
        >
          <span className="pr-[5px] font-bold"> {title} </span> {description}
        </h5>
      </div>
      <div
        className={`flex rounded-md ${closeBg} h-full w-10 cursor-pointer items-center justify-center text-xl font-bold `}
      >
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default SolidSubtleAlert;
