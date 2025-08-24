// Assets
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

const MiniStatistics = (props) => {
  const {
    bgColor,
    icon,
    title,
    value,
    growth,
    growthColor,
    cardBg,
    titleColor,
    valueColor,
    detailColor,
    iconColor,
  } = props;
  return (
    <div
      className={`flex ${cardBg} justify-between rounded-[20px] bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none`}
    >
      <div>
        <h5 className={`font-dm text-sm font-medium ${titleColor} `}>
          {" "}
          {title}{" "}
        </h5>
        <p className={`font-dm text-2xl font-bold ${valueColor} `}> {value} </p>
        <div className="mt-1 flex items-center gap-1 text-sm text-navy-700">
          <div className={`flex items-center gap-1 font-bold ${growthColor} `}>
            <p>
              {growth[0] === "-" ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
            </p>
            <p>{growth}</p>
            <p className={`font-dm font-medium text-gray-600 ${detailColor} `}>
              Since last month
            </p>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center ${bgColor} h-20 w-20 justify-center rounded-full ${iconColor} `}
      >
        {icon}
      </div>
    </div>
  );
};

export default MiniStatistics;
