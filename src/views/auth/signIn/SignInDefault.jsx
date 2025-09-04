import { useState } from 'react';
import InputField from 'components/fields/InputField';
import PasswordField from 'components/fields/PasswordField';
import Default from 'layouts/auth/types/Default';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import { useAuthStore } from 'stores/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
function SignInDefault() {
  const { login, loading, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var navigate = useNavigate();
  
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
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            <form onSubmit={handleSignIn}>

            {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white">
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </p>
            </div> */}

            {/* <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div> */}

            {/* Email Input */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <PasswordField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              {/* <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div> */}
              <Link
                to="/auth/forgot-password/default"
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 text-base font-medium text-white transition duration-200 ${
                loading
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            </form>

            {/* <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/auth/sign-up/default"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div> */}
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
