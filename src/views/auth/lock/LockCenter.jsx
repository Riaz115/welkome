import React from "react";
import Centered from "layouts/auth/types/Centered";
import Card from "components/card";
import InputField from "components/fields/InputField";
function LockCenter() {
  return (
    <Centered
      maincard={
        <Card
          extra={
            "max-w-[405px] md:max-w-[550px] lg:max-w-[550px] lg:w-full h-max mt-32 md:mt-[145px] mx-2.5 md:mx-auto mb-auto pb-2.5 pt-8 md:pt-2.5 px-4 md:!p-[50px]"
          }
        >
          <p className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
            Esthera Parkson
          </p>
          <p className="mt-[10px] mb-8 ml-1 text-base text-gray-600">
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
        </Card>
      }
    />
  );
}

export default LockCenter;
