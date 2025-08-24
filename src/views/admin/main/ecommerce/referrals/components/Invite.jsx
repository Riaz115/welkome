import { IoPaperPlane } from "react-icons/io5";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import Card from "components/card";
const Invite = () => {
  return (
    <Card extra={"w-full h-full pb-[35px] pt-[30px] pr-[28px] pl-[33px]"}>
      {/* Header */}
      <div>
        <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
          Invite your friends!
        </h4>
        <p className="mt-3 text-base text-gray-600">
          Add your friends email addresses and sent them invitations to join
          Horizon UI!
        </p>
      </div>
      {/* Email input */}

      <div className="mt-[31px] flex w-full items-center gap-3 rounded-full border border-gray-200 py-1 pr-1 pl-[20px] dark:!border-white/10">
        <input
          type="text"
          id="username"
          placeholder="Email addresses..."
          className="placeholder:text-lightFourth h-full w-full text-sm text-navy-700 outline-none dark:!bg-navy-800 dark:text-white"
        />
        <button className="flex items-center justify-center rounded-full bg-brand-500 p-3 text-base text-white transition duration-200 hover:cursor-pointer  hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <IoPaperPlane />
        </button>
      </div>
      {/* share section */}
      <div className="mt-[60px]">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Share the referral link
        </p>
        <p className="mt-3 text-base leading-6 text-gray-600">
          You can also share your referral link by copying and sending it to
          your friends or sharing it on social media.
        </p>
      </div>

      {/* links */}
      <div
        onClick={function () {
          navigator.clipboard.writeText("simmmple.com/referral =9421738401");
        }}
        className="mt-4 flex h-fit w-full flex-wrap items-start gap-2 md:!flex-nowrap md:items-center lg:justify-between"
      >
        <div className="flex w-full items-center justify-between rounded-full bg-lightPrimary py-3 hover:cursor-pointer dark:!bg-navy-700 3xl:w-full">
          <p className="w-full px-3 text-sm font-medium text-navy-700 dark:text-white">
            simmmple.com/referral=948401
          </p>
          <p className="w-full to-brand-500 pr-3 text-xs font-bold text-brand-500 text-end dark:text-white">
            Copy Link
          </p>
        </div>
        <button className="flex items-center justify-center rounded-full bg-lightPrimary p-3 text-lg text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <IoLogoFacebook />
        </button>
        <button className="flex items-center justify-center rounded-full bg-lightPrimary p-3 text-lg text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <IoLogoTwitter />
        </button>
      </div>
    </Card>
  );
};

export default Invite;
