import Planbg from "assets/img/dashboards/Blueprint.png";
import Card from "components/card";
const Plan = () => {
  return (
    <Card extra={"flex flex-col w-full relative p-4 h-full"}>
      <h4 className="mb-4 ml-px text-lg font-bold text-navy-700 dark:text-white">
        House Plan
      </h4>
      <img className="w-[300px] self-center" alt="plan" src={Planbg} />
      <div className="mt-8 flex h-full w-full items-center justify-between">
        <div>
          <p className="mb-px font-dm text-sm font-medium text-gray-600">
            First Floor
          </p>
          <p className="font-dm text-sm font-bold text-navy-700 dark:text-white">
            22 Seaview, 2073sq ft
          </p>
        </div>
        <button className="flex items-center justify-center rounded-xl bg-brand-800 px-4 py-2 font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-900 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          See all plans
        </button>
      </div>
    </Card>
  );
};

export default Plan;
