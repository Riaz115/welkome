// Assets
import { MdOutlineCloudUpload } from "react-icons/md";
import DropZonefile from "views/admin/main/ecommerce/settingsProduct/components/DropZonefile";

const Media = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="mb-6 pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Media
      </h4>
      {/* content */}
      <div className="flex w-full items-center justify-center rounded-[20px]">
        <DropZonefile
          content={
            <div className="flex h-[225px] w-full flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-gray-200 bg-gray-100 dark:!border-none dark:!bg-navy-700 sm:w-[400px] md:w-[570px] lg:w-[700px] xl:w-[600px] 2xl:w-[690px] 3xl:w-[680px]">
              <p className="text-[80px] text-navy-700">
                <MdOutlineCloudUpload className="text-brand-500 dark:text-white" />
              </p>
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                Drop your files here, or{" "}
                <span className="font-bold text-brand-500 dark:text-brand-400">
                  browse
                </span>
              </p>
              <p className="pt-2 text-sm text-gray-600">
                PNG, JPG and GIF files are allowed
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Media;
