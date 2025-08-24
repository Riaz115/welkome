import React from "react";
import EagleView from "./components/EagleView";
import MapCard from "./components/MapCard";
import Phone from "./components/Phone";

const CarInterface = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 3xl:grid-cols-5">
      {/* left side */}
      <div className="col-span-1 h-full w-full rounded-[20px] lg:grid-cols-11 3xl:col-span-3">
        <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-11">
          <div className="col-span-1 lg:col-span-5">
            <EagleView />
          </div>
          <div className="col-span-1 lg:col-span-6">
            <Phone />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="col-span-1 3xl:col-span-2">
        <MapCard />
      </div>
    </div>
  );
};

export default CarInterface;
