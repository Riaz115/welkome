import AddDevice from "./components/AddDevice";
import Consumption from "./components/Consumption";
import General from "./components/General";
import Home from "./components/Home";
import Light from "./components/Light";
import MapCard from "./components/MapCard";
import Plan from "./components/Plan";
import Temperature from "./components/Temperature";
import Weather from "./components/Weather";

const SmartHome = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-11">
      {/* left side */}
      <div className="col-span-11 h-fit w-full lg:col-span-8">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 3xl:grid-cols-3">
          <div>
            <Home />
          </div>
          <div>
            <Temperature />
          </div>
          <div>
            <Weather />
          </div>
          <div>
            <Plan />
          </div>
          <div>
            <Light />
          </div>
          <div>
            <General />
          </div>
        </div>
        {/* Charts and upload device sectionn */}
        <div className="mt-5 grid h-full w-full grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-6 xl:col-span-8">
            <Consumption />
          </div>
          <div className=" col-span-12 lg:col-span-6 xl:col-span-4">
            <AddDevice />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="col-span-11 w-full lg:col-span-3">
        <MapCard />
      </div>
    </div>
  );
};

export default SmartHome;
