import InputField from "components/fields/InputField";
import Default from "layouts/auth/types/Default";
import React from "react";

function LockDefault() {
  return (
    <Default
      maincard={
        <div className="mb-16 flex h-full w-full items-center justify-center md:mx-0 md:px-0 lg:mb-10 lg:items-start lg:justify-start">
          <div className="mt-[16vh] flex w-[500px] flex-col rounded-[20px] pb-16 pt-12 md:pr-6 lg:pr-0 xl:pr-24">
            {/* Lock section */}
            <div className="flex flex-col rounded-[20px] bg-white dark:!bg-navy-900">
              <h2 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
                Esthera Parkson
              </h2>
              <p className="mt-[10px] ml-1 mb-8 text-base text-gray-600">
                Enter your password to unlock your account!
              </p>
              {/* Email */}
              <InputField
                variant="auth"
                label="Password"
                placeholder="Min. 8 characters"
                id="email"
                type="password"
              />
              {/* button */}
              <button className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Unlock
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default LockDefault;
