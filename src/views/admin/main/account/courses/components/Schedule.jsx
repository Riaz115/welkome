// Assets
import Event from "components/dataDisplay/Event";
import { BsArrowRight } from "react-icons/bs";

const Schedule = () => {
  return (
    <div className="w-full rounded-[20px] bg-white px-[20px] py-8 font-dm shadow-xl shadow-gray-100 dark:border dark:!border-white/10 dark:!bg-navy-800 dark:shadow-none 3xl:px-[30px]">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h4 className="leading-1 text-lg font-bold text-navy-700 dark:text-white">
          Schedule
        </h4>
        <div className="flex items-center gap-2">
          <p className="w-max text-sm font-medium text-brand-500 transition-all hover:mr-1 hover:cursor-pointer dark:text-white">
            View all Tasks
          </p>
          <p className="text-base text-brand-500 hover:cursor-pointer dark:text-white">
            <BsArrowRight />
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Event
          title="UX/UI Workshop"
          time="01:00 PM - 02:00 PM"
          eventBg="bg-lightPrimary"
          mb="mb-3"
        />
        <Event
          title="Product Design Course"
          time="02:00 PM - 03:25 PM"
          eventBg="bg-white"
          mb="mb-3"
        />
        <Event
          title="Design Strategy Workshop"
          time="03:00 PM - 04:00 PM"
          eventBg="bg-white"
          mb="mb-3"
        />
      </div>
    </div>
  );
};

export default Schedule;
