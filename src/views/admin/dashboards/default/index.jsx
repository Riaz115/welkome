import Balance from "./components/Balance";
import DailyTraffic from "./components/DailyTraffic";
import MostVisited from "./components/MostVisited";
import OverallRevenue from "./components/OverallRevenue";
import ProfitEstimation from "./components/ProfitEstimation";
import ProjectStatus from "./components/ProjectStatus";
import YourCard from "./components/YourCard";
import YourTransfers from "./components/YourTransfers";

import tableDataMostVisited from "./variables/tableDataMostVisited";

const Dashboard = () => {
  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] rounded-[20px] xl:flex-row">
      <div className="h-full w-full rounded-[20px]">
        {/* left side */}
        <div className="col-span-9 h-full w-full rounded-t-2xl xl:col-span-6">
          {/* overall & Balance */}
          <div className="mb-5 grid grid-cols-6 gap-5">
            <div className="col-span-6 h-full w-full rounded-xl 3xl:col-span-4">
              <OverallRevenue />
            </div>
            <div className="col-span-6 w-full 3xl:col-span-2">
              <Balance />
            </div>
          </div>
          {/* Daily Traffic and.. */}
          <div className="mt-5 grid w-full grid-cols-6 gap-5">
            <div className="col-span-6 md:col-span-3 3xl:col-span-2">
              <DailyTraffic />
            </div>
            <div className="col-span-6 md:col-span-3 3xl:col-span-2">
              <ProjectStatus />
            </div>
            <div className="col-span-6 3xl:col-span-2">
              <ProfitEstimation />
            </div>
          </div>
          {/* Your Transfers & tables */}
          <div className="mt-5 grid w-full grid-cols-6 gap-5">
            <div className="col-span-6 3xl:col-span-2">
              <YourTransfers />
            </div>
            <div className="col-span-6 3xl:col-span-4">
              <MostVisited tableData={tableDataMostVisited} />
            </div>
          </div>
        </div>
      </div>

      {/* line */}
      <div className="flex w-0 bg-gray-200 dark:bg-navy-700 xl:w-px" />

      {/* right section */}
      <div className="h-full w-full xl:w-[400px] xl:min-w-[300px] 2xl:min-w-[400px]">
        <YourCard />
      </div>
    </div>
  );
};

export default Dashboard;
