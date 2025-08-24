import CardMenu from "components/card/CardMenu";
import LineChart from "components/charts/LineChart";
import React from "react";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { lineChartDataProjectStatus } from "variables/charts";
import { lineChartOptionsProjectStatus } from "variables/charts";
import Card from "components/card";

function ProjectStatus() {
  return (
    <Card extra={"p-5 text-dm lg:h-full"}>
      <div className="relative flex items-center justify-between">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          Project Status
        </p>
        <CardMenu />
      </div>
      <div className="mb-auto mt-4 flex items-center justify-between">
        <div className="flex justify-center gap-[20px]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lightPrimary text-2xl text-brand-500 dark:bg-navy-700 dark:text-white">
            <MdOutlineShoppingBasket />
          </div>
          <div>
            <p className="text-base font-bold leading-5 text-navy-700 dark:text-white">
              eCommerce
            </p>
            <p className="mt-1 text-sm font-medium leading-5 text-gray-600">
              UI Design
            </p>
          </div>
        </div>
        <div>
          <p className="mr-1 text-2xl font-bold text-navy-700 dark:text-white">
            71<span className="text-xs">%</span>
          </p>
        </div>
      </div>
      {/* Charts */}
      <div className="h-[250px] w-full overflow-hidden">
        <LineChart
          chartData={lineChartDataProjectStatus}
          chartOptions={lineChartOptionsProjectStatus}
        />
      </div>
    </Card>
  );
}

export default ProjectStatus;
