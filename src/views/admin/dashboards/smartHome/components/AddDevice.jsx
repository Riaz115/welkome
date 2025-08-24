import Card from "components/card";
import { MdAdd } from "react-icons/md";

const AddDevice = () => {
  return (
    <Card extra={"flex flex-col justify-center p-[28px] w-full h-full"}>
      <div className="flex h-[205px] w-full items-center justify-center rounded-[20px] border-2 border-dashed border-gray-200 bg-gray-100 hover:cursor-pointer dark:border-white/10 dark:!bg-navy-700">
        <button className="flex items-center justify-center rounded-[20px] bg-brand-500 p-3 text-4xl font-bold text-white shadow-2xl shadow-brand-500 dark:bg-brand-400 dark:shadow-brand-400">
          <MdAdd />
        </button>
      </div>
      <div className="mt-3 flex w-full flex-col items-center justify-center text-center xl:px-1 2xl:px-4">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          Add new device
        </h4>
        <p className="mt-1 text-center text-sm font-medium text-gray-600">
          Evolve your smart house with a new device!
        </p>
      </div>
    </Card>
  );
};

export default AddDevice;
