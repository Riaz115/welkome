const Event = (props) => {
  const { title, time, eventBg, mb } = props;
  return (
    <div
      className={`flex w-full flex-col dark:!bg-navy-700 ${eventBg} ${mb} rounded-xl py-3 px-4 3xl:p-4 `}
    >
      <h5 className="text-base font-bold text-navy-700 dark:text-white">
        {title}{" "}
      </h5>
      <p className="text-sm font-medium text-gray-600"> {time} </p>
    </div>
  );
};

export default Event;
