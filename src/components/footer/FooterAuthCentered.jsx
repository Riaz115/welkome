/*eslint-disable*/
import React from "react";
export default function Footer() {
  return (
    <div className="z-[1.5] mx-auto flex w-full max-w-[90%] flex-col items-center justify-between px-0 pt-12 pb-8 xl:w-[1170px] xl:max-w-[1170px] xl:flex-row">
      <p className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
        ©{1900 + new Date().getYear()} Horizon UI. All Rights Reserved.
      </p>
      <ul className="flex flex-wrap items-center sm:flex-nowrap">
        <li className="mr-12">
          <a
            target="blank"
            href="mailto:hello@simmmple.com"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base"
          >
            Support
          </a>
        </li>
        <li className="mr-12">
          <a
            target="blank"
            href="https://simmmple.com/licenses"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base"
          >
            License
          </a>
        </li>
        <li className="mr-12">
          <a
            target="blank"
            href="https://simmmple.com/terms-of-service"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base"
          >
            Terms of Use
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://blog.horizon-ui.com/"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base"
          >
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
}
