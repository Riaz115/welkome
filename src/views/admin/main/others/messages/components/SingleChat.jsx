import Card from "components/card";
import { BiSearch } from "react-icons/bi";
import CardMenu from "components/card/CardMenu";
import profile from "assets/img/profile/avatar2.png";
import SingleMessage from "./SingleMessage";
import {
  MdChevronLeft,
  MdImage,
  MdOutlineAttachment,
  MdOutlineTagFaces,
} from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";
import {
  renderThumbMessages,
  renderTrackMessages,
  renderViewMessages,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";

function SingleChat(props) {
  const { open, onClose } = props;
  return (
    <div
      className={`duration-175 !fixed left-0 top-[20px] !z-[50] h-[calc(100vh-40px)] w-[calc(100vw-40px)] flex-col !font-dm transition-all md:h-[calc(100vh-40px)] lg:!relative lg:left-[unset] lg:top-[unset] lg:!z-[unset] lg:my-0 lg:flex lg:h-full lg:w-[unset] ${
        open
          ? "translate-x-[20px] lg:translate-x-[0px]"
          : "-translate-x-[120%] lg:translate-x-[0px]"
      }`}
    >
      <Card extra={"w-full h-full p-4 !font-dm"}>
        {/* header */}
        <div className="mb-auto flex  items-center justify-between border-b border-gray-200 pb-3 dark:!border-navy-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center gap-2">
              <div onClick={onClose} className={"block lg:hidden"}>
                <MdChevronLeft className="h-5 w-5 text-gray-500 dark:text-white" />
              </div>
              <div className="h-[50px] w-[50px] rounded-full">
                <img
                  src={profile}
                  className="h-full w-full rounded-full"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h1 className="font-dm text-[20px] font-bold text-navy-700 dark:text-white">
                {" "}
                Roberto Michael
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <h4 className="text-base text-navy-700 dark:text-white">
                  Active
                </h4>
              </div>
            </div>
          </div>
          <div className="flex">
            <p className="flex w-max items-center text-[24px] hover:cursor-pointer">
              <BiSearch />
            </p>
            <CardMenu vertical />
          </div>
        </div>
        {/* message content */}
        <div className="relative h-[calc(100%-70px)] pt-2">
          <div className="flex h-[calc(100%-74px)] w-full">
            <Scrollbars
              renderTrackVertical={renderTrackMessages}
              renderThumbVertical={renderThumbMessages}
              renderView={renderViewMessages}
            >
              <div className="relative max-h-max overflow-hidden pb-[30px] lg:max-h-[unset] lg:overflow-visible">
                <SingleMessage
                  message="Hi there, How are you? All good?"
                  time="05:34 PM"
                  extra="!bg-lightPrimary w-fit rounded-r-xl rounded-bl-xl"
                  text="text-navy-700"
                  timecolor="text-gray-400 dark:text-white"
                />
                <SingleMessage
                  message="I saw an amazing dashboard called Horizon UI Dashboard, is made by Simmmple, I want to know what you think about it, because I like it so much! 😁"
                  time="09:00 PM"
                  extra="!bg-lightPrimary w-full md:w-[480px] rounded-r-xl rounded-bl-xl"
                  text="text-navy-700"
                  timecolor="text-gray-400 dark:text-white"
                />
                <SingleMessage
                  message="Go and check it out! Here is the link: 
          horizon-ui.com/chakra-pro/"
                  time="09:00 PM"
                  extra="!bg-lightPrimary w-fit md:w-[300px] rounded-r-xl rounded-bl-xl"
                  text="text-navy-700"
                  timecolor="text-gray-400 dark:text-white"
                />
                <div className="flex flex-col items-end">
                  <SingleMessage
                    message="Hello, Roberto! Hope you are fine! Let me take a look! Sounds interesting!"
                    time="09:00 PM"
                    extra="bg-brand-500 w-fit md:w-[380px] rounded-l-xl rounded-br-xl"
                    text="text-white"
                    timecolor="text-white"
                  />
                  <SingleMessage
                    message="OMG!! It’s so innovative and awesome! I think I am going to buy it for my projects! It’s a game changer!!🔥"
                    time="09:00 PM"
                    extra="rounded-l-xl w-fit md:w-[460px] rounded-br-xl bg-brand-500 text-white"
                    text="text-white"
                    timecolor="text-white"
                  />
                </div>
              </div>
            </Scrollbars>
          </div>
          {/*  */}
          <div className="mt-6 flex items-center gap-2">
            <div className=" flex h-[50px] w-full items-center rounded-full bg-lightPrimary pr-3 dark:bg-navy-700">
              <p className="text-lightSecondary pl-3 text-xl hover:cursor-pointer">
                <MdOutlineTagFaces />
              </p>
              <input
                placeholder="Write your message...."
                className="h-full w-full rounded-full bg-lightPrimary px-2 text-sm text-navy-700 outline-none dark:bg-navy-700 dark:text-white"
                type="text"
              />
              <div className="flex items-center gap-4">
                <p className="text-lightSecondary text-xl hover:cursor-pointer">
                  <MdOutlineAttachment />
                </p>

                <p className="text-lightSecondary pr-2 text-xl hover:cursor-pointer">
                  <MdImage />
                </p>
              </div>
            </div>
            {/* button */}
            <button className="linear flex items-center justify-center rounded-full bg-brand-500 p-3 text-base text-white transition duration-200 hover:cursor-pointer  hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              <IoPaperPlane />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SingleChat;
