import Course from "components/card/Course";
import MiniCalendar from "components/calendar/MiniCalendar";
import EtherLogoOutline from "components/icons/EtherLogoOutline";
import { useState } from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineUpgrade } from "react-icons/md";

import Schedule from "./components/Schedule";
import Hours from "./components/Hours";
import Card from "components/card";

const Courses = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="mt-3 flex h-full w-full flex-col font-dm md:gap-7 lg:flex-row">
      <div className="h-full w-full rounded-[20px]">
        {/* tabs */}
        <div className="mb-4 mt-2 flex h-full w-full flex-col items-center rounded-xl bg-white/70 pl-[45px] shadow-2xl shadow-white dark:!bg-navy-900 dark:!shadow-none xl:mb-3">
          <div className="flex w-full justify-start gap-11 overflow-hidden text-3xl">
            <div
              className={
                toggleState === 1
                  ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                  : "flex items-center gap-2 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-900"
              }
              onClick={() => toggleTab(1)}
            >
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                All
              </h5>
              <p className="text-sm font-medium text-gray-600">0</p>
            </div>

            <div
              className={
                toggleState === 2
                  ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer"
                  : "flex items-center gap-2 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-900"
              }
              onClick={() => toggleTab(2)}
            >
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Upcoming
              </h5>
              <p className="text-sm font-medium text-gray-600">4</p>
            </div>

            <div
              className={
                toggleState === 5
                  ? " flex items-center gap-2 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer"
                  : "flex items-center gap-2 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-900"
              }
              onClick={() => toggleTab(5)}
            >
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Active
              </h5>
              <p className="text-sm font-medium text-gray-600">12</p>
            </div>
          </div>
        </div>

        {/* course section */}
        <Course
          extra="mb-5"
          bgBox="bg-gradient-to-br from-[#7A64FF] via-[#FF508B] to-[#FD6D53]"
          icon={<IoLogoInstagram />}
          title="Instagram Marketing 2022: Complete Guide To Growth"
          desc="Attract Hyper-Targeted Instagram Followers, Convert Followers to Paying Customers, & Expand your Brand Using Instagram"
          day="Mon"
          date="January 05"
          topics={["Social Media Marketing", "Instagram Marketing"]}
          time="1h 30 min"
        />

        <Course
          extra="mb-5"
          bgBox="bg-gradient-to-br from-[#92FE9D] to-[#00C9FF]"
          icon={<MdOutlineUpgrade />}
          title="SEO 2022: Complete SEO Training + SEO for Websites"
          desc="Competitor, Keyword Research, Content, Technical SEO, Core Web Vitals, Page speed, Backlinks, UX SEO :WordPress Training"
          day="Fri"
          date="February 23"
          topics={["SEO Training", "Website SEO 2022"]}
          time="4h 45 min"
        />
        <Course
          bgBox="bg-gradient-to-br from-[#FF9966] to-[#FF5E62]"
          icon={<EtherLogoOutline />}
          title="Solidity & Ethereum in React (Next JS): The Complete Guide"
          desc="Create real Smart Contracts in Solidity and DApps with React & Next JS. Understand how the Ethereum blockchain works"
          day="Wed"
          date="March 02"
          topics={["Blockchain", "Ethereum", "ReactJS"]}
          time="8h 05 min"
        />
      </div>
      {/* line */}
      <div className="h-0 w-0 bg-gray-300 dark:!bg-navy-700 lg:h-[1050px] lg:w-px" />

      {/* right section */}
      <div className="mt-1 flex h-full w-full flex-col items-center rounded-[20px] bg-white px-4 py-4 shadow-2xl shadow-gray-100 dark:!bg-navy-800 dark:shadow-none lg:w-[275px] 3xl:w-[470px]">
        {/* Calendar */}
        <Card extra={`max-w-full`}>
          <MiniCalendar />
        </Card>
        {/* schedule */}
        <Card extra={"w-full mt-4"}>
          <Schedule />
        </Card>
        {/* Hours */}
        <Card extra={"w-full mt-4"}>
          <Hours />
        </Card>
      </div>
    </div>
  );
};

export default Courses;
