import Card from "components/card";
import React from "react";
import CircularProgress from "components/charts/CircularProgress";
import "react-circular-progressbar/dist/styles.css";

function Conversion() {
  return (
    <Card extra={"w-full py-4 px-8"}>
      <div className="mt-2 flex flex-col px-4 text-center">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          User Conversion
        </p>
        <p className="mt-2 px-4 text-sm font-medium text-gray-600">
          Discover your stats, and learn more about your business users
        </p>
      </div>
      {/* Circular progressbar */}
      <div className="mx-auto mt-3 flex h-[140px] w-[130px] items-center justify-center">
        <CircularProgress title="Conversion" percentage="66" />
      </div>

      {/* profit */}
      <div className="mt-2 flex h-fit w-full items-center justify-center rounded-[20px] px-4 py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="ml-1 text-xs font-normal text-gray-600">Est. Users</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            8540
          </p>
        </div>
        <div className="mx-8 h-11 w-px bg-gray-400 dark:!bg-white/20" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="ml-1 text-xs font-normal text-gray-600">
              Est. Purchases
            </p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            $3.984
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Conversion;
