import Centered from "layouts/auth/types/Centered";
import Card from "components/card";
import React from "react";
import PinInput from "react-pin-input";

function VerificationCenter() {
  return (
    <Centered
      maincard={
        <Card extra="max-w-[405px] md:max-w-[550px] h-max mt-32 md:mt-[120px] mx-2.5 md:mx-auto mb-auto pb-2.5 pt-8 md:pt-2.5 px-4 md:!p-[50px]">
          <h3 className="mt-1 text-4xl font-bold text-navy-700 dark:text-white">
            2-Step Verification
          </h3>
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
              style={{ padding: "10px" }}
              inputStyle={{
                borderWidth: "2px",
                width: "75px",
                height: "75px",
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
          <button className="w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Unlock
          </button>
          <p className="mt-4 text-sm font-medium text-navy-700 dark:text-gray-500">
            Haven't received it?
            <span className="text-sm font-medium text-brand-500 dark:text-white">
              {" "}
              Resend a new code{" "}
            </span>
          </p>
        </Card>
      }
    />
  );
}

export default VerificationCenter;
