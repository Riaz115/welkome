import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, onChange, width] = useState(new Date());

  return (
    <div>
      <div
        className={`flex ${
          width ? `w-[${width}]` : "w-full md:w-[320px]"
        } h-full max-w-full flex-col rounded-[20px] bg-white px-3 py-4 dark:border dark:!border-white/10 dark:!bg-navy-800`}
      >
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6" />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6" />}
          view={"month"}
        />
      </div>
    </div>
  );
};

export default MiniCalendar;
