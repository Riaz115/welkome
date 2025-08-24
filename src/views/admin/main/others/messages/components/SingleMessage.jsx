import React from "react";

function SingleMessage(props) {
  const { message, time, extra, text, timecolor } = props;
  return (
    <div className={`mb-3 dark:!bg-navy-700 ${extra} p-5`}>
      <h1 className={`text-md pb-2 text-navy-700 dark:text-white ${text}`}>
        {message}
      </h1>
      <p className={`${timecolor} text-sm font-medium`}> {time} </p>
    </div>
  );
}

export default SingleMessage;
