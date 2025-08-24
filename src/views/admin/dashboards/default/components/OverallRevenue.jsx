import Card from "components/card";
import LineChart from "components/charts/LineChart";
import { MdArrowDropUp } from "react-icons/md";
import { lineChartDataOverallRevenue } from "variables/charts";
import { lineChartOptionsOverallRevenue } from "variables/charts";

function OverallRevenue() {
  const newOptions = {
    ...lineChartOptionsOverallRevenue,
    colors: ["var(--color-500)", "#39B8FF"],
  };

  return (
    <Card extra={"h-[381px] pb-8 px-6 pt-6"}>
      <div className="flex justify-between px-3 pt-1">
        <div className="flex items-center">
          <div className="flex flex-col">
            <p className="text-[34px] font-bold text-navy-700 dark:text-white">
              {" "}
              $37.5K
            </p>
            <p className="text-sm font-medium text-gray-600">
              Overall Revenue{" "}
            </p>
          </div>
          <div className="ml-4 flex items-end pb-2">
            <MdArrowDropUp className="font-medium text-green-500" />
            <span className="text-sm font-bold text-green-500">+2.45%</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="flex h-full w-full flex-row sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart
            chartData={lineChartDataOverallRevenue}
            chartOptions={newOptions}
          />
        </div>
      </div>
    </Card>
  );
}

export default OverallRevenue;
