// Assets
import diploma from "assets/img/account/Diploma.png";
import { MdFlag, MdCheck, MdChevronRight, MdLock } from "react-icons/md";
import React from "react";
import CircularProgressMini from "components/charts/CircularProgressMini";
import Card from "components/card";

const Completed = () => {
  return (
    <Card extra={"w-full p-4"}>
      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
        Instagram Marketing: Complete Guide
      </h4>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-base font-medium uppercase text-gray-600">
          3/5 completed
        </p>
        <p className="text-lg text-green-500">
          <MdFlag />
        </p>
      </div>
      <div className="mt-[20px] grid w-full grid-cols-5 gap-2">
        <div className="h-2 w-full rounded-[36px] bg-green-500" />
        <div className="h-2 w-full rounded-[36px] bg-green-500" />
        <div className="h-2 w-full rounded-[36px] bg-green-500" />
        <div className="h-2 w-full rounded-[36px] bg-lightPrimary dark:bg-white/10" />
        <div className="h-2 w-full rounded-[36px] bg-lightPrimary dark:bg-white/10" />
      </div>
      {/* circular and texts */}
      <div>
        <div className="mt-[19px] flex items-center justify-between gap-2 hover:cursor-pointer">
          <div className="flex gap-2">
            <div className="w-[30px]">
              <CircularProgressMini step="1" percentage="100" />
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 dark:text-white">
              <p> Introduction to Marketing </p>
              <p className="mt-1 text-lg">
                <MdCheck />
              </p>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-white">
            <MdChevronRight />
          </p>
        </div>
        {/*second */}
        <div className="mt-[19px] flex items-center justify-between gap-2 hover:cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-[30px]">
              <CircularProgressMini step="2" percentage="100" />
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 dark:text-white">
              <p className="4xl:w-max"> Understanding the Instagram </p>
              <p className="mt-1 text-lg">
                <MdCheck />
              </p>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-white">
            <MdChevronRight />
          </p>
        </div>
        {/* third */}
        <div className="mt-[19px] flex items-center justify-between gap-2 hover:cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-[30px]">
              <CircularProgressMini step="3" percentage="22" />
            </div>
            <div className="flex items-center gap-1 font-medium text-green-500">
              <p> Creating An Instagram Ad Account </p>
              <p className="mt-1 text-lg"> </p>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-white">
            <MdChevronRight />
          </p>
        </div>
        {/* Fourth */}
        <div className="mb-1 mt-[19px] flex items-center justify-between gap-2 hover:cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-[30px]">
              <CircularProgressMini step="4" percentage="0" />
            </div>
            <div className="flex items-center gap-1 font-medium text-navy-700 dark:text-white">
              <p>Instagram Ads for Creators </p>
              <p className="mt-1 text-lg text-navy-700 dark:text-white">
                <MdLock />
              </p>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-white">
            <MdChevronRight />
          </p>
        </div>
        {/* five */}
        <div className="mt-[19px] flex items-center justify-between gap-2 hover:cursor-pointer">
          <div className="itemce flex gap-2">
            <div className="w-[30px]">
              <CircularProgressMini step="5" percentage="0" />
            </div>
            <div className="flex items-center gap-1 font-medium text-navy-700 dark:text-white">
              <p> Monetizing your Personal Account </p>
              <p className="mt-1 text-lg text-navy-700 dark:text-white">
                <MdLock />
              </p>
            </div>
          </div>
          <p className="text-2xl text-gray-600 dark:text-white">
            <MdChevronRight />
          </p>
        </div>
      </div>
      {/* what you'll learn */}
      <div className="mt-8">
        <h5 className="text-xl font-bold text-navy-700 dark:text-white">
          What you’ll learn
        </h5>
        <p className="mt-3 text-navy-700 dark:text-white">
          You’ll learn to have a powerful Instagram account setup for your
          Business or personal that you can build your brand and convert your
          followers into paying customers, how to attract 20,000 real followers
          to your account and how to convert your new Instagram followers to
          long-term loyal paying customers who love your business!
        </p>
      </div>

      <div className="mt-[52px]">
        <h5 className="mb-3 text-xl font-bold text-navy-700 dark:text-white">
          By the numbers
        </h5>
        <div className="flex w-max flex-wrap items-center justify-between gap-5 lg:w-full">
          <div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Skill level:</h5>
              <p className="font-medium text-navy-700 dark:text-white">
                All levels
              </p>
            </div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Students:</h5>
              <p className="font-medium text-navy-700 dark:text-white">3468</p>
            </div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Languages:</h5>
              <p className="font-medium text-navy-700 dark:text-white">
                English
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Captions:</h5>
              <p className="font-medium text-navy-700 dark:text-white">Yes</p>
            </div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Lectures:</h5>
              <p className="font-medium text-navy-700 dark:text-white">277</p>
            </div>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-600">Video:</h5>
              <p className="font-medium text-navy-700 dark:text-white">
                35.6hrs
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Horizon certificate */}
      <div className="mt-[58px] mb-3 w-[300px] lg:w-full">
        <h5 className="text-xl font-bold text-navy-700 dark:text-white">
          Horizon Academy Certificate
        </h5>

        <div className="mt-3 w-full rounded-[20px] bg-lightPrimary p-3 shadow-2xl shadow-lightPrimary dark:shadow-none">
          <div className="h-full w-full rounded-[20px] bg-white">
            <img
              className="w-full rounded-[20px]"
              src={diploma}
              alt="diploma"
            />
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="mt-2 flex w-max items-center justify-between px-3 font-medium lg:w-full xl:px-10">
        <a
          className="text-brand-500 hover:text-brand-500 dark:text-white"
          href="https://www.orimi.com/pdf-test.pdf"
        >
          Download PDF
        </a>
        <div className="mx-3 h-5 w-px bg-gray-600" />
        <a
          className="text-brand-500 hover:text-brand-500 dark:text-white"
          href="https://www.orimi.com/pdf-test.pdf"
        >
          Download JPG
        </a>
      </div>
    </Card>
  );
};

export default Completed;
