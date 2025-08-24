// Assets
import { useState } from "react";

const General = (props) => {
  const { icon, onValue, offValue, text, extra, initial } = props;
  // states of controller
  const [stateOff, setStateOff] = useState(initial);

  return (
    <div
      onClick={() => setStateOff(!stateOff)}
      className="flex w-full flex-col items-center hover:cursor-pointer"
    >
      <button
        className={`linear mb-2 flex items-center justify-center rounded-full bg-white px-4 py-4 text-[30px] transition-all duration-200 dark:!bg-navy-800 ${
          stateOff
            ? "bg-lightPrimary from-[#0B1330] to-[#111C44] text-gray-600 shadow-inset shadow-shadow-500 dark:!bg-gradient-to-b dark:text-white/20 dark:!shadow-none"
            : "from-[#ffffff0f] to-white/0 text-brand-500 shadow-xl shadow-shadow-500 dark:bg-gradient-to-b dark:text-gray-200 dark:shadow-darkinset dark:shadow-white/20"
        } ${extra}`}
      >
        {icon}
      </button>
      <div>
        <p className="text-sm font-medium text-gray-600">
          {text}:{" "}
          <span
            className={`${
              stateOff
                ? "text-gray-600 dark:text-white"
                : "text-brand-500 dark:text-white"
            } text-sm font-bold hover:cursor-pointer`}
          >
            {stateOff ? offValue : onValue}
          </span>
        </p>
      </div>
    </div>
  );
};

export default General;
