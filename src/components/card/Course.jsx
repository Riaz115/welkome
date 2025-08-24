import { MdOutlineTimer } from "react-icons/md";

const Course = (props) => {
  const { bgBox, icon, title, desc, day, date, topics, time, extra } = props;
  return (
    <div
      className={`flex h-fit w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 !pb-10 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:flex-row 3xl:h-[310px] ${extra}`}
    >
      <div
        className={`${bgBox} mr-8 flex min-h-[200px] min-w-full items-center justify-center rounded-xl text-[100px] text-white 2xl:h-[270px] 2xl:min-w-[270px]`}
      >
        {icon}
      </div>

      <div className="w-full justify-between pt-6 3xl:ml-8">
        <div>
          <div className="flex flex-col 2xl:flex-row">
            <div>
              <h2 className="font-bold leading-7 text-navy-700 dark:text-white md:text-[18px] 3xl:text-[28px] 3xl:leading-10">
                {title}
              </h2>
              <p className="mt-3 text-base text-gray-600">{desc} </p>
            </div>
            <div className="flex w-max justify-end gap-1 font-medium">
              <p className="mt-2 w-max text-gray-600"> {day} •</p>
              <p className="mt-2 w-max text-base text-navy-700 dark:text-white">
                {" "}
                {date}{" "}
              </p>
            </div>
          </div>

          {/* marketing button */}
          <div className="mt-4 flex flex-col flex-wrap items-center gap-2 md:flex-row">
            <div className="flex h-7 w-max items-center justify-center rounded-lg bg-lightPrimary px-2 text-xs font-bold uppercase tracking-wide text-brand-500 dark:bg-white/5 dark:text-white">
              {topics[0]}
            </div>
            <div className="flex h-7 w-max items-center justify-center rounded-lg bg-lightPrimary px-2 text-xs font-bold uppercase tracking-wide text-brand-500 dark:bg-white/5 dark:text-white">
              {topics[1]}
            </div>
            <div
              className={`flex h-7 w-max items-center justify-center rounded-lg px-2 text-xs font-bold uppercase tracking-wide ${
                topics[2]
                  ? "bg-lightPrimary text-brand-500 dark:bg-white/5 dark:text-white"
                  : "!hidden"
              } `}
            >
              {topics[2]}
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-navy-700 dark:text-white 2xl:ml-auto">
              <p>
                <MdOutlineTimer />
              </p>
              <p> {time} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
