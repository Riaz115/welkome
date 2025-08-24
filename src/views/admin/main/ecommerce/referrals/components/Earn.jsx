// Assets
import Card from "components/card";
import DashCurveDown from "components/icons/DashCurveDown";
import DashCurveUp from "components/icons/DashCurveUp";

import { MdCheckCircle, MdComment, MdPersonAddAlt1 } from "react-icons/md";

const Earn = () => {
  return (
    <Card extra={"w-full pb-[80px] pt-[30px] px-[29px] h-fit xl:h-[500px]"}>
      {/* Header */}
      <div className="mt-1">
        <p className="text-2xl font-semibold text-navy-700 dark:text-white">
          Earn with Horizon UI
        </p>
        <p className="mt-4 text-base text-gray-600">
          Invite your friends to Horizon, if they sign up, you and your friend
          will get 2 premium features for free!
        </p>
      </div>

      <div className="relative mt-[70px] flex w-full flex-col justify-center gap-[50px] md:flex-row">
        <div
          className={`absolute left-[150px] hidden text-brand-500 dark:text-white md:block lg:left-[230px] xl:left-[200px] 2xl:left-[270px] 3xl:left-[180px] 4xl:left-[270px]`}
        >
          <DashCurveUp />
        </div>
        <div className="absolute right-[140px] top-[60px] hidden text-brand-500 dark:text-white md:block lg:right-[230px] xl:right-[200px] 2xl:right-[260px] 3xl:right-[170px] 4xl:right-[250px]">
          <DashCurveDown />
        </div>

        {/* icons */}
        <div className="flex flex-col items-center">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full from-[#ffffff0f] to-white/0 text-[40px] text-brand-500 shadow-xl shadow-gray-100 dark:!bg-gradient-to-b dark:text-white dark:shadow-darkinset dark:!shadow-white/20">
            <MdComment />
          </div>
          {/* text */}
          <div className="flex flex-col items-center">
            <p className="mt-[18px] text-xl font-bold text-navy-700 dark:text-white">
              Send Invitation
            </p>
            <p className="mt-3 text-center text-base text-gray-600">
              Send your referral link to friends and tell them how useful
              Horizon is!
            </p>
          </div>
        </div>
        {/* icons2 */}
        <div className="mr-[14px] flex flex-col items-center">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full from-[#ffffff0f] to-white/0 text-[40px] text-brand-500 shadow-xl shadow-gray-100 dark:!bg-gradient-to-b dark:text-white dark:shadow-darkinset dark:!shadow-white/20">
            <MdPersonAddAlt1 />
          </div>
          {/* text */}
          <div className="flex flex-col items-center">
            <p className="mt-[18px] text-xl font-bold text-navy-700 dark:text-white">
              Registration
            </p>
            <p className="mt-3 text-center text-base text-gray-600">
              Let your friends register to our services using your personal
              referral code!
            </p>
          </div>
        </div>
        {/* icons3 */}
        <div className="flex flex-col items-center">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full from-[#ffffff0f] to-white/0 text-[40px] text-brand-500 shadow-xl shadow-gray-100 dark:!bg-gradient-to-b dark:text-white dark:shadow-darkinset dark:!shadow-white/20">
            <MdCheckCircle />
          </div>
          {/* text */}
          <div className="flex flex-col items-center">
            <p className="mt-[18px] text-center text-xl font-bold text-navy-700 dark:text-white">
              Use Horizon for Free!
            </p>
            <p className="mt-3 text-center text-base text-gray-600">
              You and your friends get 2 premium Horizon features for free!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Earn;
