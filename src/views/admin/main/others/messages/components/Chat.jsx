function Chat(props) {
  const { photo, active, name, time, message, last } = props;

  return (
    <div
      className={`flex w-full items-center gap-3 px-2 ${
        last ? "pt-6 pb-3" : "border-b border-gray-100 py-6"
      }  cursor-pointer dark:!border-navy-700 lg:cursor-pointer`}
    >
      <div className="relative h-[50px] !w-[60px] rounded-full">
        <img className="h-full w-full rounded-full" src={photo} alt="" />
        {active ? (
          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
        ) : null}
      </div>

      {/*  */}
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold capitalize text-navy-700 dark:text-white">
            {" "}
            {name}{" "}
          </h1>
          <h4 className="text-sm font-medium text-gray-400 ">{time} </h4>
        </div>
        <p className="text-sm font-normal tracking-normal text-navy-700 dark:text-white">
          {message}{" "}
        </p>
      </div>
    </div>
  );
}

export default Chat;
