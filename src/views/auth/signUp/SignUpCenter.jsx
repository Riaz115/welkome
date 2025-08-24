import Card from "components/card";
import InputField from "components/fields/InputField";
import Centered from "layouts/auth/types/Centered";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

function SignUpCenter() {
  return (
    <Centered
      maincard={
        <Card extra="max-w-[405px] md:max-w-[510px] h-max mx-2.5 md:mx-auto mt-12 mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
          <h3 className="text-4xl font-bold text-navy-700 dark:text-white">
            Sign Up
          </h3>
          <p className="mt-[10px] ml-1 text-base text-gray-600">
            Enter your email and password to sign up!
          </p>
          <div className="mt-9 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:!bg-navy-700">
            <div className="rounded-full text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 dark:text-white">
              Sign Up with Google
            </p>
          </div>
          <div className="mt-6 mb-4 flex items-center gap-3">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <p className="text-base font-medium text-gray-600"> or </p>
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </div>
          {/* user info */}
          <div className="mb-3 flex w-full items-center justify-center gap-4">
            <div className="w-1/2">
              <InputField
                variant="auth"
                extra="mb-3"
                label="First Name*"
                placeholder="John"
                id="firstname"
                type="text"
              />
            </div>

            <div className="w-1/2">
              <InputField
                variant="auth"
                extra="mb-3"
                label="Last Name*"
                placeholder="Doe"
                id="lastname"
                type="text"
              />
            </div>
          </div>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
          />
          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min 8 characters"
            id="password"
            type="password"
          />
          {/* Checkbox */}
          <div className="mt-2 flex items-center justify-between px-2">
            <div className="flex">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                By creating an account means you agree to the Terms and
                Conditions, and our Privacy Policy
              </p>
            </div>
          </div>

          <button className=" mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Create my account
          </button>

          <div className="mt-3">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
              Already a member?
            </span>
            <a
              href=" "
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
            >
              Sign In
            </a>
          </div>
        </Card>
      }
    />
  );
}

export default SignUpCenter;
