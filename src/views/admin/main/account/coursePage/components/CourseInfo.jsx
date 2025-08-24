// Assets
import Card from "components/card";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Instructor from "./Instructor";
import Rating from "./Rating";

const CourseInfo = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <Card extra={"w-full !py-6 !pb-16 !px-4 md:!px-10"}>
      {/* Header */}
      <div className="mb-2 mt-3 flex items-center justify-end">
        <div className="flex items-center gap-3">
          <p className="text-base font-medium uppercase text-gray-600 dark:text-white">
            Chapter 3/5
          </p>
          {/* arrow button */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded-full border-2 border-gray-600 p-1.5 text-3xl text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:border-white dark:bg-none dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
              <MdChevronLeft />
            </button>
            <button className="flex items-center justify-center rounded-full bg-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              <MdChevronRight />
            </button>
          </div>
        </div>
      </div>
      {/* tabs */}
      <div className="mb-1 flex w-full flex-col items-center rounded-xl xl:mb-3">
        <div className="flex w-full justify-start gap-8 overflow-hidden text-3xl">
          <div
            className={
              toggleState === 1
                ? " flex items-center gap-3 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-3 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-800"
            }
            onClick={() => toggleTab(1)}
          >
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Notes
            </p>
          </div>

          <div
            className={
              toggleState === 2
                ? " flex items-center gap-3 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-3 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-800"
            }
            onClick={() => toggleTab(2)}
          >
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Resources
            </p>
          </div>

          <div
            className={
              toggleState === 5
                ? " flex items-center gap-3 border-b-[4px] border-brand-500 pb-3 hover:cursor-pointer dark:border-brand-400"
                : "flex items-center gap-2 border-b-[4px] border-white pb-3 hover:cursor-pointer dark:!border-navy-800"
            }
            onClick={() => toggleTab(5)}
          >
            <p className="text-[18px] font-medium text-navy-700 dark:text-white">
              Quiz
            </p>
            <p className="text-lg font-medium text-navy-700 dark:text-white">
              (3){" "}
            </p>
          </div>
        </div>
      </div>
      {/* main text */}
      <div className="4xl:grid-cols-[2.95fr 1fr] grid">
        {/* left side */}
        <div className="4xl:col-start-1 4xl:col-end-2 4xl:row-start-1 4xl:row-end-2">
          {/* paragraphs */}
          <div className="mt-10 pr-4 text-lg text-gray-700 dark:text-white">
            <p className="mb-10 leading-6">
              Once you spend just a few hours learning the powerful proven
              Instagram marketing techniques, you will see why we are the
              recommend course. We have easy to follow step by step techniques
              to grow your followers and market your business.
            </p>
            <p className="mb-10 leading-7">
              Your time will pay off by reaching thousands of new customers, and
              building a strong, trustworthy relationship through Instagram will
              skyrocket your brand awareness to a level beyond your
              expectations. You will have the tools to create quality content,
              grow your Instagram followers and market your business to these
              hyper-targeted customers.
            </p>
            <p>
              When making a purchasing decision, people online use your social
              media presence as a measure of the quality, and trustworthiness of
              your business. Nothing speaks trust and quality louder than having
              a thousands of targeted, real, and loving Instagram followers on
              your profile (of which you can contact at any time!) Your profile
              will be professional and compelling and you will be using stories,
              live streaming and all the other new features Instagram releases.
            </p>
          </div>

          {/* Rating section */}
          <div className="flex w-full max-w-full flex-col items-center justify-between pt-[75px] md:flex-row">
            {/* left side */}
            <div className="mb-3 md:mb-0 md:mr-12">
              <p className="text-[74px] font-bold text-yellow-500">4.8</p>
              <div className="flex items-center text-2xl text-yellow-500">
                <p>
                  <IoMdStar />
                </p>
                <p>
                  <IoMdStar />
                </p>
                <p>
                  <IoMdStar />
                </p>
                <p>
                  <IoMdStar />
                </p>
                <p>
                  <IoMdStar />
                </p>
              </div>
              <p className="mt-2 text-base font-medium text-gray-600">
                Course Rating
              </p>
            </div>
            {/* right side */}
            <div className="md:mr-8">
              <Rating value="78" stars="5" mb="mb-1" />
              <Rating value="24" stars="4" mb="mb-1" />
              <Rating value="12" stars="3" mb="mb-1" />
              <Rating value="8" stars="2" mb="mb-1" />
              <Rating value="4" stars="1" mb="mb-1" />
            </div>
          </div>
        </div>
        {/* Instructor */}
        <div className="mt-10 4xl:col-start-2 4xl:col-end-3 4xl:row-start-1 4xl:row-end-2">
          <Instructor />
        </div>
      </div>
    </Card>
  );
};

export default CourseInfo;
