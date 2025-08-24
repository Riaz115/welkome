import InputField from "components/fields/InputField";
import Default from "layouts/auth/types/Default";
import React from "react";

function ForgotPasswordDefault() {
  return (
    <Default
      maincard={
        <div className="mb-16 flex h-full w-full items-center justify-center md:mx-0 md:px-0 lg:mb-10 lg:items-start lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[16vh] flex flex-col rounded-[20px] pb-16 pt-12 md:pr-6 lg:max-w-[90%] lg:pr-0 xl:max-w-[42%] xl:pr-24">
            <h2 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
              Forgot Your Password?
            </h2>
            <p className="mt-[10px] ml-1 mb-8 text-base text-gray-600">
              No problem. Just let us know your email address and we'll email
              you a password reset link that will allow you to choose a new one.
            </p>
            {/* Email */}
            <InputField
              variant="auth"
              label="Email"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
            />
            {/* button */}
            <button className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Email password reset link
            </button>
          </div>
        </div>
      }
    />
  );
}

export default ForgotPasswordDefault;
