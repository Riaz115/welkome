// Assets
import Card from "components/card";
import MasterCardIcon from "components/icons/MasterCardIcon";
import VisaIcon from "components/icons/visaIcon";
import { MdEdit } from "react-icons/md";

const PaymentMethod = () => {
  return (
    <Card extra={"w-full px-[33px] h-fit 2xl:h-[290px] py-3 mt-3"}>
      <h4 className="mt-3 ml-1 font-dm text-lg font-bold text-navy-700 dark:text-white">
        Payment Method
      </h4>

      {/* MasterCard */}
      <div className="mt-[28px] flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-[21px] dark:!border-white/10">
        <div className="flex items-center justify-center gap-2">
          <h3>
            <MasterCardIcon />
          </h3>
          <h4 className="font-dm text-gray-700 dark:text-white">
            7812 2139 0823 XXXX
          </h4>
        </div>

        <div className="text-base text-gray-700 hover:cursor-pointer dark:text-white">
          <MdEdit className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-[22px] flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-[20px] dark:!border-white/10">
        <div className="flex items-center justify-center gap-2 text-brand-500 dark:text-white">
          <h6>
            <VisaIcon />
          </h6>
          <h6 className="font-dm text-gray-700 dark:text-white">
            7812 2139 0823 XXXX
          </h6>
        </div>

        <div className="text-base text-gray-700 hover:cursor-pointer">
          <MdEdit className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
};

export default PaymentMethod;
