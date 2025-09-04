import Card from 'components/card';
import InputField from 'components/fields/InputField';
import PasswordField from 'components/fields/PasswordField';
import Centered from 'layouts/auth/types/Centered';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import { useAuthStore } from 'stores/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

function SignInCenter() {
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    if (!email.trim() || !password.trim()) {
      alert('Please enter email and password.');
      return;
    }
    console.log('Signing in with', { email, password });
    await login({
      email,
      password,
      navigate,
    });
  };

  return (
    <Centered
      bgImage="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
      maincard={
        <Card extra="max-w-[405px] md:max-w-[510px] md:w-[510px] h-max mx-2.5 md:mx-auto mt-[120px] py-8 px-4 md:!p-[60px] pt-12 md:pt-[60px]">
          <h3 className="mb-[10px] text-4xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h3>
          <p className="mb-9 ml-1 text-lg  text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <form onSubmit={handleSignIn}>
          {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-700 dark:text-white">
            <div className="rounded-full text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 dark:text-white">
              Sign In with Google
            </p>
          </div> */}
          {/* <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <p className="text-base font-medium text-gray-600"> or </p>
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </div> */}
          <InputField
            variant="auth"
            extra="mb-6"
            label="Enter Email *"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordField
            variant="auth"
            extra="mb-3"
            label="Enter Password *"
            placeholder="Min. 8 characters"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2 flex items-center justify-between px-2">
            {/* <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div> */}
            <Link
              className="text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              to="/auth/forgot-password/centered"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full rounded-xl py-3 text-base font-medium text-white transition duration-200 ${
              loading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          </form>
          {/* <div className="mt-3">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
              Not registered yet?
            </span>
            <a
              href=" "
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
            >
              Create an Account
            </a>
          </div> */}
        </Card>
      }
    />
  );
}

export default SignInCenter;
