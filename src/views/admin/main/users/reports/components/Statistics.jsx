const Statistics = (props) => {
  const { icon, title, value, endContent } = props;
  return (
    <div className="flex h-[88px] w-full justify-between rounded-[20px] bg-white bg-clip-border px-4 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h5 className="text-sm font-medium leading-5 text-gray-600">
            {title}
          </h5>
          <p className="mt-1 text-2xl font-bold leading-6 text-navy-700 dark:text-white">
            {value}
          </p>
        </div>
      </div>

      {endContent}
    </div>
  );
};

export default Statistics;
