// Assets
import { MdShare, MdEdit, MdDownload } from "react-icons/md";
const Banner = () => {
  return (
    <div className="mx-auto rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 px-4 pt-9 pb-[140px] font-dm md:w-[90%] md:pb-[70px] lg:h-[315px] lg:!px-[50px] lg:pt-[70px] xl:!px-[50px] 3xl:w-full">
      {/* Header */}
      <div className="mb-3 flex justify-between">
        <div className="flex h-7 w-[110px] items-center justify-center rounded-[10px] bg-brand-400 text-sm font-bold text-white">
          PAID INVOICE
        </div>

        {/* buttons */}
        <div className="flex gap-[12px]">
          {/* button invoice */}
          <button className="flex items-center justify-center rounded-lg bg-brand-400 p-2 text-xl text-white transition-opacity hover:cursor-pointer hover:opacity-80">
            <MdEdit />
          </button>
          <a href="https://docdro.id/jNrQiMH" target="blank">
            <button className="flex items-center justify-center rounded-lg bg-brand-400 p-2 text-xl text-white transition-opacity hover:cursor-pointer hover:opacity-80">
              <MdDownload />
            </button>
          </a>
          <button className="flex items-center justify-center rounded-lg bg-gradient-to-br from-[#FA709A] to-[#FEE140] p-2 text-xl text-white transition-opacity hover:cursor-pointer hover:opacity-80">
            <MdShare />
          </button>
        </div>
      </div>
      {/* banner content */}
      <div className="flex flex-col md:flex-row">
        <div className="mb-[24px]">
          <h1 className="text-xl font-bold text-white md:text-3xl lg:text-[38px]">
            Invoice #03941
          </h1>
          <h5 className="mt-2 text-lg font-normal text-white lg:text-xl">
            IV BYP 9428 99
          </h5>
        </div>

        <div className="mx-[50px] h-0 w-px bg-gray-600 md:h-[94px]" />

        <div className="xl:pr-40 3xl:pr-20">
          <p className="leading-1 text-base text-white lg:text-xl">
            2845 Main Street
          </p>
          <p className="leading-1 text-base leading-10 text-white lg:text-xl">
            Lakewood, California
          </p>
          <p className="leading-1 text-base text-white lg:text-xl">
            United States 48207
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
