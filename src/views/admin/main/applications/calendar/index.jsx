import EventCalendar from "components/calendar/EventCalendar";
import Event from "./components/Event";
import TimeLine from "./components/TimeLine";
import { calendarData } from "./variables/calendar";
const Calendar = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-11 gap-5 rounded-[20px]">
      <div className="b col-span-11 w-full rounded-[20px] lg:col-span-4">
        <div>
          <TimeLine />
        </div>
        <div className="mt-5">
          <Event />
        </div>
      </div>
      {/* Calendar */}
      <div className="z-0 col-span-11 h-full w-full rounded-[20px] bg-white bg-clip-border px-[24px] py-[20px] shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none lg:col-span-7">
        {/* Calendar Header */}
        <div>
          <h5 className="text-xl font-bold text-navy-700 dark:text-white">
            Calendar
          </h5>
          <p className="mt-1 text-base font-medium text-gray-600">March 2023</p>
        </div>
        <div className="mt-[28px] h-[700px] w-full rounded-[20px] dark:text-white">
          <EventCalendar initialDate="2022-10-01" calendarData={calendarData} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
