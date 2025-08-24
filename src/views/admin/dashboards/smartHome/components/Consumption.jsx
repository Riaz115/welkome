import { MdPieChart } from "react-icons/md";
import BarChart from "components/charts/BarChart";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import Card from "components/card";

const Consumption = () => {
  return (
    <Card extra={"flex flex-col w-full relative h-[355px] px-[25px] py-[29px]"}>
      {/* Header */}
      <div className="mt-1 flex w-full justify-between px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Consumption per Day
        </h4>
        <button className="flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdPieChart />
        </button>
      </div>

      {/* Chart section */}

      <div className="h-full w-full">
        <BarChart
          chartData={barChartDataConsumption}
          chartOptions={barChartOptionsConsumption}
        />
      </div>
    </Card>
  );
};

export default Consumption;
