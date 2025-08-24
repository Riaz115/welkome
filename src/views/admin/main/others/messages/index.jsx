import SingleChat from "./components/SingleChat";
import CardMenu from "components/card/CardMenu";
import { BsPencilSquare } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Chat from "./components/Chat";
import avatar1 from "assets/img/profile/avatar1.png";
import avatar2 from "assets/img/profile/avatar2.png";
import avatar4 from "assets/img/profile/avatar4.png";
import avatar5 from "assets/img/profile/avatar5.png";
import avatar6 from "assets/img/profile/avatar6.png";
import avatar7 from "assets/img/profile/avatar7.png";
import avatar8 from "assets/img/profile/avatar8.png";
import avatar9 from "assets/img/profile/avatar9.png";
import Card from "components/card";
import React from "react";
const Messages = () => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (open && window.innerWidth < 800)
      document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "unset";
  });
  return (
    <div className="mt-[80px] flex w-full grid-cols-10 flex-col gap-5 md:mt-[20px] lg:mt-6 lg:min-h-[85vh] lg:flex-row">
      <div className="w-full lg:w-[35%]">
        <Card extra={"w-full h-full p-4"}>
          {/* header */}
          <div className="mb-3 flex items-center justify-between">
            <h1 className="font-dm text-[24px] font-bold text-navy-700 dark:text-white">
              Your Chats
            </h1>
            <CardMenu vertical />
          </div>
          {/* search */}
          <div className="flex w-full items-center gap-2">
            <div className="flex h-[42px] w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white ">
              <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </p>
              <input
                type="text"
                placeholder="Search..."
                className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
              />
            </div>
            <button className="flex items-center justify-center rounded-full bg-brand-500 p-[12px] text-base font-medium text-white transition duration-200 hover:bg-blue-700 active:bg-blue-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
              <BsPencilSquare />
            </button>
          </div>
          {/* messages */}
          <div className="mt-4">
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar2}
                active={true}
                name="Roberto Michael"
                time="09:00 PM"
                message="Hi there, How are you? All good?"
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar1}
                active={false}
                name="Emily James"
                time="08:45 PM"
                message="Be careful, it’s raining outside! :)"
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar5}
                active={true}
                name="Alexander Parker"
                time="08:42 PM"
                message="It contains a lot of good lessons about effective..."
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar4}
                active={false}
                name="Esthera William"
                time="06:32 PM"
                message="Wow! This picture is amazing! Send me more!"
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar8}
                active={true}
                name="Lawrence Peter"
                time="06:30 PM"
                message="You look so amazing today!"
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar9}
                active={true}
                name="Iaon Dint"
                time="05:57 PM"
                message="I’m back from Belgium, do you want to meet?"
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                photo={avatar6}
                active={false}
                name="William Jackson"
                time="04:32 PM"
                message="That’s awesome!!! What technology do you used..."
              />
            </div>
            <div onClick={() => setOpen(true)}>
              <Chat
                last
                photo={avatar7}
                active={true}
                name="Markus Aurelius"
                time="01:08 PM"
                message="Hello! How you doin’? I’m going to Italy this week..."
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full lg:w-[64.5%]">
        <SingleChat open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Messages;
