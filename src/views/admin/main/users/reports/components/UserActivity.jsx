import BarChart from "components/charts/BarChart";
import {
  barChartDataUserActivity,
  barChartOptionsUserActivity,
} from "variables/charts";

const UserActivity = () => {
  return (
    <div className="relative flex h-[355px] w-full flex-col rounded-[20px] bg-white bg-clip-border px-[25px] py-[29px] shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
      {/* Header */}
      <div className="flex w-full justify-between px-[8px]">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          User Activity
        </h4>
        <select
          className="text-sm font-medium text-gray-600 dark:!bg-navy-800 dark:text-white"
          name=""
          id=""
        >
          <option value="weekly">Weekly</option>
          <option value="weekly">Monthly</option>
          <option value="weekly">Yealy</option>
        </select>
      </div>

      {/* Chart section */}

      <div className="h-full w-full">
        <BarChart
          chartData={barChartDataUserActivity}
          chartOptions={barChartOptionsUserActivity}
        />
      </div>
    </div>
  );
};

export default UserActivity;
