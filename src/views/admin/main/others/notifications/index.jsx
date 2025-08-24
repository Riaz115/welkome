import Card from "components/card";
import { AiFillExclamationCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import SolidSubtleAlert from "./components/SolidSubtleAlert";
import SolidSubtleMultiAlert from "./components/SolidSubtleMultiAlert";
const Notification = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-5 rounded-[20px] lg:grid-cols-2">
      {/* Solid alert */}
      <div className="col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Solid Alert - Left
          </h4>
          {/* Alerts */}

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            bg="bg-red-500 dark:!bg-red-300"
            mb="mb-14"
            solid="solid"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-amber-500 dark:!bg-amber-200"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-blue-500 dark:!bg-blue-300"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<BsFillCheckCircleFill />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-green-500 dark:!bg-green-300"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
        </Card>
        {/* solid alert center */}
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Solid Alert - Center
          </h4>
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            bg="bg-red-500 dark:!bg-red-300"
            mb="mb-14"
            solid="solid"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-amber-500 dark:!bg-amber-200"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-blue-500 dark:!bg-blue-300"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<BsFillCheckCircleFill />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-green-500 dark:!bg-green-300"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
        </Card>
      </div>

      {/* subtle alert left*/}
      <div className="col-span-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Subtle Alert - Left
          </h4>
          {/* Alerts */}

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-red-500"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
            bg="bg-[#FDE0D0] dark:!bg-navy-700"
            mb="mb-14"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-amber-500"
            bg="bg-[#FFF6DA] dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-blueSecondary"
            bg="bg-[#E9E3FF] dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            icon={<BsFillCheckCircleFill />}
            iconColor="text-green-500"
            bg="bg-[#C9FBD5] dark:!bg-navy-700 "
            mb="mb-6"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />
        </Card>
        {/* subtle alert center */}
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Subtle Alert - Center
          </h4>
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-red-500"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
            bg="bg-[#FDE0D0] dark:!bg-navy-700"
            mb="mb-14"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-amber-500"
            bg="bg-[#FFF6DA] dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />
          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<AiFillExclamationCircle />}
            iconColor="text-blueSecondary"
            bg="bg-brand-50 dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />

          <SolidSubtleAlert
            title="Title here"
            description="Description here."
            justify="justify-center"
            icon={<BsFillCheckCircleFill />}
            iconColor="text-green-500"
            bg="bg-[#C9FBD5] dark:!bg-navy-700"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-navy-700 dark:text-white"
          />
        </Card>
      </div>

      {/* multi Alert section */}
      <div className="col-span-2 grid w-full grid-cols-1 gap-5 px-[4px] lg:grid-cols-2 2xl:px-40">
        {/* Solid Multi Alert */}
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Solid MultiAlert
          </h4>
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            bg="bg-red-500 dark:!bg-red-300"
            mb="mb-14"
            solid="solid"
          />
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-amber-500 dark:!bg-amber-200"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-blue-500 dark:!bg-blue-300"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />

          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<BsFillCheckCircleFill />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-green-500 dark:!bg-green-300"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
        </Card>

        {/* Subtle Multi Alert */}
        <Card extra={"w-full h-full px-[18px] py-[18px]"}>
          {/* Header */}
          <h4 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
            Subtle MultiAlert
          </h4>
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-red-500"
            closeBg="hover:bg-white/20 text-navy-900 dark:text-white"
            bg="bg-[#FDE0D0] dark:!bg-navy-700"
            mb="mb-14"
          />
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-amber-500"
            bg="bg-[#FFF6DA] dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-900 dark:text-white"
          />
          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<AiFillExclamationCircle />}
            iconColor="text-blueSecondary"
            bg="bg-[#E9E3FF] dark:!bg-navy-700"
            mb="mb-14"
            closeBg="hover:bg-white/20 text-navy-900 dark:text-white"
          />

          <SolidSubtleMultiAlert
            title="Title here"
            description="Description here."
            icon={<BsFillCheckCircleFill />}
            iconColor="text-green-500"
            bg="bg-[#C9FBD5] dark:!bg-navy-700"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-navy-900 dark:text-white"
          />
        </Card>
      </div>
    </div>
  );
};

export default Notification;
