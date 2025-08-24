import { MdShare, MdEdit, MdDownload } from "react-icons/md";
import Content from "./Content";
import Card from "components/card";
const Receipt = () => {
  return (
    <Card extra={"w-full h-full px-6 py-6"}>
      {/* Banner */}
      <div
        // style={{ backgroundImage: `url(${Details})` }}
        className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat px-6 pb-10 pt-11 md:!h-[180px] md:items-start md:pl-[50px] md:pr-[57px] 2xl:!h-[190px]"
      >
        <div className="">
          <h2 className="text-sm font-bold text-white sm:text-lg md:text-[30px] xl:!text-[40px] 2xl:pt-3">
            Order #09746
          </h2>
          <p className="text-xs text-white sm:text-sm md:mt-1 md:text-xl xl:!text-xl 2xl:pt-1">
            July 27, 2022 at 09:44 AM
          </p>
        </div>
        {/* buttons */}
        <div className="mt-[13px] flex gap-[12px] md:mt-0">
          <button className="flex items-center justify-center rounded-lg bg-brand-400 p-2 text-xl text-white transition-opacity hover:cursor-pointer hover:opacity-80">
            <MdEdit />
          </button>
          <a href="https://docdro.id/jNrQiMH" target="blank">
            <button className="flex items-center justify-center rounded-lg bg-brand-400 p-2 text-xl text-white transition-opacity hover:cursor-pointer hover:opacity-80">
              <MdDownload />
            </button>
          </a>
          <button className="flex items-center justify-center rounded-lg bg-gradient-to-br from-[#FA709A] to-[#FEE140] p-2 text-xl text-white hover:cursor-pointer">
            <MdShare />
          </button>
        </div>
      </div>
      {/* content */}
      <div className="h-full w-full">
        <Content />
      </div>
    </Card>
  );
};

export default Receipt;
