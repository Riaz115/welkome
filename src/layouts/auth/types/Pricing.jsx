import NavbarAuth from "components/navbar/NavbarAuth";
import React, { useState } from "react";
import zoho from "assets/svg/zoho-logo.svg";
import deloite from "assets/svg/deloitte-logo.svg";
import georgia from "assets/svg/georgia-logo.svg";
import google from "assets/svg/google-logo.svg";
import microsoft from "assets/svg/microsoft-logo.svg";
import msn from "assets/svg/msn-logo.svg";
import Footer from "components/footer/Footer";
import Card from "components/card";
import Sidebar from "components/sidebar";

function Pricing() {
  const [open, setOpen] = React.useState(true);
  const [activeButton, setActiveButton] = useState("monthly");
  return (
    // pricing page
    <div className="relative h-full w-full px-3 font-dm dark:bg-navy-900">
      <div className="w-100% -z-1 absolute left-0 right-0 max-h-[60vh] min-h-[60vh] overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />

      <Sidebar variant="auth" open={open} onClose={() => setOpen(false)} />
      <div className="z-1 relative">
        <NavbarAuth onOpenSidenav={() => setOpen(!open)} />
        {/* Header content */}
        <div className="mx-auto mt-[96px] flex w-full max-w-screen-sm flex-col items-center justify-center text-center md:px-3">
          <h2 className="text-[28px] font-bold text-white md:text-[44px]">
            Flexible pricing that scales with your business
          </h2>
          <p className="mt-[8px] px-8 text-sm text-white md:px-9 md:text-base">
            See our pricing plans for all Premium and Free products & templates.
            Try now our new Horizon UI Dashboard!
          </p>
          <div className="mt-7 rounded-lg bg-[#ffffff1f] py-[4px] px-[10px] text-sm font-bold text-white">
            No credit card required
          </div>
          {/* Monthly / Yearly */}
          <div className="mt-12 flex h-[50px] w-[280px] items-center rounded-full bg-navy-800 p-1.5">
            <button
              className={`linear flex h-full w-1/2 cursor-pointer select-none items-center justify-center rounded-[20px] text-xs font-bold uppercase text-brand-500 transition duration-200 ${
                activeButton === "monthly"
                  ? "bg-white text-brand-500"
                  : "bg-transparent text-white"
              } `}
              onClick={() => setActiveButton("monthly")}
            >
              Monthly
            </button>
            <button
              className={`linear flex h-full w-1/2 cursor-pointer select-none items-center justify-center rounded-[20px] text-xs font-bold uppercase text-brand-500 transition duration-200 ${
                activeButton === "yearly"
                  ? "bg-white text-navy-700"
                  : "bg-transparent text-white"
              }`}
              onClick={() => setActiveButton("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      {/* Pricing section */}
      <div className="relative mx-auto mt-12 mb-20 grid h-fit w-full max-w-[375px] grid-cols-1 gap-3 px-3 md:mb-[160px] xl:mt-16 xl:max-w-full xl:grid-cols-3 2xl:max-w-max">
        {/* 1th card */}
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px]">
          {/* Card header */}
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Freelancer
          </h5>
          <p className="mt-1 font-dm text-base font-medium text-gray-600">
            Hit the ground running.
          </p>
          <button className="linear mt-[32px] w-full rounded-xl bg-brand-50 py-2 font-dm text-base font-medium text-brand-500 transition duration-200 hover:opacity-90 active:opacity-80 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
            Start Free trial
          </button>
          {/* amount */}
          <div className="mt-8 w-full">
            <h5 className="font-dm text-4xl font-bold text-navy-700 dark:text-white">
              {activeButton === "monthly" ? "$89" : "$159"}
              <span className="text-gray-600">
                /{activeButton === "monthly" ? "mo" : "yr"}
              </span>
            </h5>
            <p className="mt-[8px] text-base font-medium text-gray-600">
              (Per subscriber per month)
            </p>
          </div>
          {/* bullet point */}
          <div className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Sell on your own terms
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:!bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Website, marketing tools & automations
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Bandwidth & storage is included
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                We’ll get you onboarded
              </h5>
            </div>
          </div>
        </Card>
        {/* 2d card */}
        <Card extra="w-full h-fit rounded-[20px] !pb-10 mt-2 xl:!-mt-8 pt-8 px-[20px]">
          {/* Popular button */}
          <div className="-mt-[45px] mb-[38px] flex w-full justify-center">
            <div className="rounded-[20px] bg-[#FFF6DA] px-3 py-[6px] text-center text-sm  font-bold text-yellow-500">
              Most popular plan
            </div>
          </div>
          {/* Card header */}
          <div className="mt-2">
            <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Company
            </h5>
            <p className="mt-1 font-dm text-base font-medium text-gray-600">
              Power-up your business.
            </p>
            <button className="linear mt-[30px] w-full rounded-xl bg-brand-500 py-2 font-dm text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Get Started
            </button>
          </div>
          {/* amount */}
          <div className="mt-[36px] w-full">
            <h5 className="font-dm text-4xl font-bold text-navy-700 dark:text-white">
              {activeButton === "monthly" ? "$189" : "$259"}
              <span className="text-gray-600">
                /{activeButton === "monthly" ? "mo" : "yr"}
              </span>
            </h5>
            <p className="text-base font-medium text-gray-600">
              (Per subscriber per month)
            </p>
          </div>
          {/* bullet point */}
          <div className="mt-6">
            <div className="mb-[20px] flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Live chat & countdowns
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Website, marketing tools & automations
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Bandwidth & storage is included
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                We’ll get you onboarded
              </h5>
            </div>
          </div>
        </Card>
        {/* 3rd card */}
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px]">
          {/* Card header */}
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Enterprise
          </h5>
          <p className="mt-1 text-base font-medium text-gray-600">
            Hit the ground running.
          </p>
          <button className="linear mt-[32px] w-full rounded-xl bg-brand-50 py-2 font-dm text-base font-medium text-brand-500 transition duration-200 hover:opacity-90 active:opacity-80 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
            Start Free trial
          </button>
          {/* amount */}
          <div className="mt-[35px] w-full">
            <h5 className="font-dm text-4xl font-bold text-navy-700 dark:text-white">
              +1 982 66 88 99{" "}
            </h5>
            <p className="mt-[4px] text-base font-medium text-gray-600">
              (Available in all countries)
            </p>
          </div>
          {/* bullet point */}
          <div className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                We’ll migrate you for free
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Live chat & countdowns
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                Bandwidth & storage is included
              </h5>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-2.5 w-2.5 items-end justify-center rounded-full bg-navy-700 dark:bg-white" />
              <h5 className="text-base font-medium text-navy-700 dark:text-white">
                We’ll get you onboarded
              </h5>
            </div>
          </div>
        </Card>
      </div>
      {/* more than section */}
      <div className="mx-auto mb-20 flex w-full max-w-screen-xl flex-col items-center justify-center pb-3 font-medium md:mb-[150px]">
        <h2 className="mb-8 text-center text-[35px] font-bold text-navy-700 dark:text-white md:mb-6 md:text-left">
          More than 25,000 users use Horizon
        </h2>
        <div className="grid grid-cols-3 place-items-center justify-items-center gap-16 xl:grid-cols-6">
          <img src={google} alt="" />
          <img src={msn} alt="" />
          <img src={microsoft} alt="" />
          <img src={zoho} alt="" />
          <img src={georgia} alt="" />
          <img src={deloite} alt="" />
        </div>
      </div>
      {/* question section */}
      <div className="mx-auto flex max-w-screen-xl flex-col items-center pb-24">
        <h2 className="mb-2 text-center text-[35px] font-bold text-navy-700 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-16 grid w-full grid-cols-1 gap-12 px-3 lg:grid-cols-2">
          {/* left side */}
          <div className="">
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                Are the images, fonts, and icons free to use?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                These products are not Wordpress themes, however, they can be
                integrated in Wordpress by an experienced web developer.
              </p>
            </div>
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                Do these themes work with Wordpress?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                These products are not Wordpress themes, however, they can be
                integrated in Wordpress by an experienced web developer.
              </p>
            </div>
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                What does the Included Documentation feature refer to?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                It means that each theme within the Exclusive Digital Bundle
                promotion has a thorough and up to date documentation on how to
                get started with the product and each components and plugin is
                properly explained.
              </p>
            </div>
          </div>

          {/* rightsidde */}
          <div>
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                Are the themes available with only classic CSS and without Sass
                as well?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                Yes, they are. Each theme has a html&css folder which contains
                the theme with classic HTML, CSS, and Javascript files.
              </p>
            </div>
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                If I purchased a Freelancer/Company License, how can I upgrade
                to the Company/Enterprise License?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                In case you have already purchased a license, but you want to
                upgrade, you can just send us a message using the contact page
                and we will send you a discount code so you will only pay the
                difference for the upgrade.
              </p>
            </div>
            <div className="mb-[58px]">
              <h3 className="text-xl font-medium text-navy-700 dark:text-white">
                What is the difference on Free and PRO products?
              </h3>
              <p className="mt-3 text-base font-medium text-gray-600">
                The differences between the Free and Pro products consists of
                the number of components, plugins, sections, pages in each
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="mx-auto max-w-screen-xl">
        <Footer />
      </div>
    </div>
  );
}

export default Pricing;
