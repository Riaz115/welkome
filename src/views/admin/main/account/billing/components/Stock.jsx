// Assets
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

const Stock = (props) => {
  const { sum, name, chart, growth } = props;

  return (
    <div className="z-[0.9] flex h-[86px] items-center justify-between">
      {/* left side */}
      <div>
        <h4 className="font-medium text-gray-600"> {name} </h4>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-navy-700 dark:text-white">
            {" "}
            {sum}{" "}
          </p>
          <p className="font-medium text-gray-600">EUR</p>
        </div>
      </div>

      {/* right Side */}
      <div className="flex items-center">
        <div className="w-[130px]">{chart}</div>
        <div className={`flex items-center gap-2 font-bold text-green-500`}>
          {growth[0] === "+" ? (
            <RiArrowUpSFill />
          ) : (
            <RiArrowDownSFill className="text-red-500" />
          )}
          <p className={growth[0] === "-" ? "text-red-500" : "text-green-500"}>
            {" "}
            {growth}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
