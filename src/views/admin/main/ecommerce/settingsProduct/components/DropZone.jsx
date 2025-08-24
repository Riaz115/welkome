import DropZonefile from "./DropZonefile";
// Assets
import { MdOutlineCloudUpload } from "react-icons/md";
import Card from "components/card";

const DropZone = () => {
  return (
    <Card extra={"w-full py-[26px] px-[30px] h-[330px]"}>
      <p className="mt-1 text-xl font-bold text-navy-700 dark:text-white">
        Product Images
      </p>
      <div className="mt-7 flex w-full items-center justify-center rounded-[20px]">
        <DropZonefile
          content={
            <div className="flex h-[205px] flex-col items-center justify-center rounded-xl !border border-dashed border-gray-200 bg-gray-100 px-[5px] dark:!border-white/10 dark:!bg-navy-700 sm:!w-[500px] md:!w-[700px] lg:!w-[900px] xl:!w-full 2xl:!w-[460px] 3xl:!w-[600px]">
              <p className="text-[80px] text-navy-700 dark:text-white">
                <MdOutlineCloudUpload />
              </p>
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                Drop your Image here, or
                <span className="pl-2 font-bold text-brand-500 dark:text-brand-400">
                  Click to browse
                </span>
              </p>
              <p className="text-lightFourth pt-2 text-sm font-medium">
                1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are
                allowed
              </p>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default DropZone;
