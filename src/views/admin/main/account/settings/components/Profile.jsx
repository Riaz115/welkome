import profileAvatar from "assets/img/avatars/avatar4.png";
import Card from "components/card";
const Profile = () => {
  return (
    <Card extra={"w-full py-[18px] px-[18px] h-[140px]"}>
      <div className="flex items-center gap-3">
        <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full">
          <img
            className="h-full w-full rounded-full"
            src={profileAvatar}
            alt="phot"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Lawrence 
          </h4>
          <p className="text-base text-gray-600">lawrence@horizon-ui.com</p>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
