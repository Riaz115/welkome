import ChairDef from "assets/img/ecommerce/ChairDef.png";
import Delete from "./components/Delete";
import Details from "./components/Details";
import DropeZone from "./components/DropZone";
import Information from "./components/Information";
import Socials from "./components/Socials";
const SettingsProduct = () => {
  return (
    <div className="mt-4 grid h-full w-full grid-cols-2 gap-5 xl:mt-3">
      {/* left side */}
      <div className="col-span-2 flex h-full w-full flex-col gap-5 xl:col-span-1">
        {/* Chair */}
        <div className="flex w-full items-center justify-center rounded-[20px] bg-white bg-cover bg-clip-border p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none xl:h-[400px] 2xl:h-[420px] 3xl:h-[460px]">
          <img
            src={ChairDef}
            className="rounded-primary h-full w-full"
            alt=""
          />
        </div>
        <div>
          <Information />
        </div>
      </div>
      {/* right side */}
      <div className="col-span-2 flex h-full w-full flex-col gap-5 xl:col-span-1">
        <DropeZone />
        <Socials />
      </div>
      {/* full width */}
      <div className="col-span-2 flex h-full w-full flex-col gap-5">
        <Details />
        <Delete />
      </div>
    </div>
  );
};

export default SettingsProduct;
