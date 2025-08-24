import Card from "components/card";
import LineAreaChart from "components/charts/LineAreaChart";

import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataAreaEventsCalendar,
  lineChartOptionsAreaEventsCalendar,
} from "variables/charts";

const Event = () => {
  return (
    <Card extra={"w-full h-[260px] p-5"}>
      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
        Completed Events
      </h4>
      <div className="mt-[2px] flex items-center gap-1 text-sm">
        <p className="text-base font-bold text-green-500">
          <RiArrowUpSFill />
        </p>
        <p className="font-bold text-green-500">+16%</p>
        <p className="font-bold text-gray-600">Since last month</p>
      </div>
      <div>
        <LineAreaChart
          chartData={lineChartDataAreaEventsCalendar}
          chartOptions={lineChartOptionsAreaEventsCalendar}
        />
      </div>
    </Card>
  );
};

export default Event;
