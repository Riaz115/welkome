import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const Rating = (props) => {
  const { stars, value, mb } = props;
  return (
    <div className={`flex items-center gap-3 ${mb} w-full`}>
      <div className="h-2 w-[100px] rounded-full bg-gray-300 md:w-[200px] lg:w-[150px] 2xl:w-[240px]">
        <div
          className={`flex h-full items-center justify-center rounded-full bg-brand-500 dark:bg-brand-400 w-${value}p`}
        />
      </div>
      <div className="flex items-center text-2xl text-yellow-500">
        <p> {stars >= 1 ? <IoMdStar /> : <IoMdStarOutline />} </p>
        <p> {stars >= 2 ? <IoMdStar /> : <IoMdStarOutline />} </p>
        <p> {stars >= 3 ? <IoMdStar /> : <IoMdStarOutline />} </p>
        <p> {stars >= 4 ? <IoMdStar /> : <IoMdStarOutline />} </p>
        <p> {stars >= 5 ? <IoMdStar /> : <IoMdStarOutline />} </p>
      </div>
      <h1 className="text-base font-bold text-gray-600"> {value}% </h1>
    </div>
  );
};

export default Rating;
