import Banner from "./components/Banner";
import Information from "./components/Information";
import Password from "./components/Password";
import Social from "./components/Social";

const ProfileSetting = () => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-[20px]">
        <div>
          <Banner />
        </div>
        <div className="mt-3">
          <Information />
        </div>
      </div>
      <div className="">
        <div>
          <Social />
        </div>
        <div>
          <Password />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
