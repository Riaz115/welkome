import Card from "components/card";
import LineChart from "components/charts/LineChart";
import { MdPieChart } from "react-icons/md";
import {
  lineChartDataMiniArea1,
  lineChartOptionsMiniArea1,
  lineChartDataMiniArea2,
  lineChartOptionsMiniArea2,
} from "variables/charts";

import Stock from "./Stock";
const Market = () => {
  return (
    <Card
      extra={
        "w-full overflow-x-scroll xl:overflow-x-hidden h-full py-4 px-[33px]"
      }
    >
      {/* Header */}
      <div className="mt-[10px] flex items-center justify-between">
        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
          Market
        </h5>
        <button className="z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdPieChart />
        </button>
      </div>
      {/* stock */}
      <div className="mt-3">
        <Stock
          name="XPEV"
          sum="350.4"
          growth="+2.45"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea1}
              chartOptions={lineChartOptionsMiniArea1}
            />
          }
        />
        <Stock
          name="TSLA"
          sum="3,485.9"
          growth="-1.51%"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea2}
              chartOptions={lineChartOptionsMiniArea2}
            />
          }
        />
        <Stock
          name="PFE"
          sum="120.4"
          growth="-1.51%"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea2}
              chartOptions={lineChartOptionsMiniArea2}
            />
          }
        />
        <Stock
          name="XPEV"
          sum="350.4"
          growth="+2.45"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea1}
              chartOptions={lineChartOptionsMiniArea1}
            />
          }
        />
        <Stock
          name="BNB"
          date="September, 07 2021"
          sum="2,983.2"
          growth="-1.51%"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea2}
              chartOptions={lineChartOptionsMiniArea2}
            />
          }
        />
        <Stock
          name="MSFT"
          sum="309.4"
          growth="+4.45"
          chart={
            <LineChart
              chartData={lineChartDataMiniArea1}
              chartOptions={lineChartOptionsMiniArea1}
            />
          }
        />
      </div>
    </Card>
  );
};

export default Market;
