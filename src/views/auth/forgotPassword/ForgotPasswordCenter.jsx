import Card from "components/card";
import InputField from "components/fields/InputField";
import Centered from "layouts/auth/types/Centered";
import React from "react";

function ForgotPasswordCenter() {
  return (
    <Centered
      maincard={
        <Card
          extra={
            "max-w-[405px] md:max-w-[550px] h-max mt-32 md:mt-[120px] mx-2.5 md:mx-auto mb-auto pb-2.5 pt-8 md:pt-2.5 px-4 md:!p-[50px]"
          }
        >
          <p className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
            Forgot Your Password?
          </p>
          <p className="mt-[10px] ml-1 mb-8 text-base text-gray-600">
            No problem. Just let us know your email address and we'll email you
            a password reset link that will allow you to choose a new one.
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
        </Card>
      }
    />
  );
}

export default ForgotPasswordCenter;
