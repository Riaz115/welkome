import Car from "assets/img/dashboards/Tesla.png";
import Card from "components/card";

const EagleView = () => {
  return (
    <Card extra={"flex flex-col items-center py-4 px-3 w-full h-full"}>
      <p className="mt-[28px] text-base font-semibold text-navy-700 dark:text-white">
        Welcome back, sir.
      </p>
      {/* car image */}
      <div className="mt-14 h-fit w-fit">
        <img className="h-full w-full" src={Car} alt="" />
      </div>
      <div className="flex flex-col items-center">
        <p className="mt-[56px] text-[17px] text-gray-600">
          Your Model S is now in{" "}
          <span className="font-bold text-navy-700 dark:text-white">
            {" "}
            Parking Mode{" "}
          </span>
        </p>
        <button className="mt-14 flex items-center justify-center rounded-xl bg-brand-800 px-24 py-2 font-dm text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-900 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Turn on Engine
        </button>
      </div>
      <div className="flex items-center justify-center gap-[32px] py-16 text-xl">
        <p className="font-medium text-gray-600">N</p>
        <p className="font-medium text-gray-600">R</p>
        <p className="text-5xl font-bold text-navy-700 dark:text-white">P</p>
        <p className="font-medium text-gray-600">D</p>
        <p className="font-medium text-gray-600">M</p>
      </div>
    </Card>
  );
};

export default EagleView;
