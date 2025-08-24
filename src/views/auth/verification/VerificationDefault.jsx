import Default from "layouts/auth/types/Default";
import React from "react";
import PinInput from "react-pin-input";

function VerificationDefault() {
  return (
    <Default
      maincard={
        <div className="mb-16 flex h-full w-full items-center justify-center dark:!bg-navy-900 md:mx-0 md:px-0 lg:mb-10 lg:items-start lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[16vh] flex flex-col rounded-[20px] bg-white pb-16 pt-12 dark:!bg-navy-900 md:pr-6 lg:pr-0 xl:pr-24">
            <h2 className="mt-1 text-4xl font-bold text-navy-700 dark:text-white">
              2-Step Verification
            </h2>
            <p className="mt-[15px] ml-1 text-[15px] text-gray-600">
              Enter your 2-Step Verification email code to unlock!
            </p>
            {/* verification */}
            <div className="mt-7 mb-4 flex w-full items-center justify-center">
              <PinInput
                length={4}
                initialValue=""
                onChange={(value, index) => {}}
                type="numeric"
                inputMode="number"
                style={{ marginBottom: "10px" }}
                inputStyle={{
                  borderWidth: "2px",
                  width: "92px",
                  height: "92px",
                  borderColor: "#E0E5F2",
                  borderRadius: "16px",
                  color: "#2B3674",
                  fontSize: "36px",
                }}
                inputFocusStyle={{ borderColor: "#4318FF", borderWidth: "3px" }}
                onComplete={(value, index) => {}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </div>
            {/* button */}
            <button className="h-[50px] w-full rounded-xl bg-brand-500 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Unlock
            </button>
            <p className="mt-4 text-sm font-medium text-navy-700 dark:text-gray-500">
              Haven't received it?
              <span className="text-sm font-medium text-brand-500 dark:text-white">
                {" "}
                Resend a new code{" "}
              </span>
            </p>
          </div>
        </div>
      }
    />
  );
}

export default VerificationDefault;
