import Information from "./components/Information";
import Connect from "./components/Connect";
import Delete from "./components/Delete";
import NewsLetter from "./components/NewsLetter";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Session from "./components/Session";
import Social from "./components/Social";
import TwoFactor from "./components/TwoFactor";

const Setting = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-5 rounded-[20px] lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <Profile />
        <Information />
        <Social />
        <Password />
      </div>

      <div className="flex flex-col gap-5">
        <TwoFactor />
        <NewsLetter />
        <Session />
        <Connect />
        <Delete />
      </div>
    </div>
  );
};

export default Setting;
