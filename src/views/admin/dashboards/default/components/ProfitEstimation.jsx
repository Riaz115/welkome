import Card from "components/card";
import CircularProgress from "components/charts/CircularProgress";
import "react-circular-progressbar/dist/styles.css";
import React from "react";
function ProfitEstimation() {
  return (
    <Card extra={"p-5 lg:h-full"}>
      <div className="mb-auto flex flex-col px-2 text-center">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          Profit Estimation
        </p>
        <p className="mt-2 px-4 text-sm font-medium text-gray-600">
          Discover your profit, and learn more about your business
        </p>
      </div>
      {/* Circular progressbar */}
      <div className="mx-auto mb-5 mt-4 flex h-40 w-36 items-center justify-center">
        <CircularProgress title="Conversion" percentage={66} />
      </div>

      {/* profit */}
      <Card extra="!flex-row !justify-between px-6 py-4 mb-2 rounded-[20px] dark:!bg-navy-700">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-start justify-center">
            <p className="mb-1 text-xs font-medium text-gray-600">Est. Sales</p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            1540
          </p>
        </div>
        <div className="h-12 w-[1px] bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-center justify-center">
            <p className="mb-1 text-xs font-medium text-gray-600">
              Est. Profit
            </p>
          </div>
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            $3.984
          </p>
        </div>
      </Card>
    </Card>
  );
}

export default ProfitEstimation;
