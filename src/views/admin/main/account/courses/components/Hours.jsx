import {
  barChartDataHoursSpent,
  barChartOptionsHoursSpent,
} from "variables/charts";
import BarChart from "components/charts/BarChart";

const Hours = () => {
  return (
    <div className="w-full rounded-[20px] bg-white font-dm shadow-2xl shadow-gray-100 dark:border dark:!border-white/10 dark:!bg-navy-800 dark:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 3xl:px-8">
        <p className="leading-1 text-lg font-bold text-navy-700 dark:text-white">
          Hours Spent
        </p>
        <p className="leading-1 text-sm font-bold text-navy-700 dark:text-white">
          22 h 45 min
        </p>
      </div>
      <div className="h-[210px] w-full px-4 2xl:px-8">
        <BarChart
          chartData={barChartDataHoursSpent}
          chartOptions={barChartOptionsHoursSpent}
        />
      </div>
    </div>
  );
};

export default Hours;
