import React from "react";
import profile from "assets/img/crm/vbz.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";

const Banner = () => {
  return (
    <Card extra={"items-center pt-[16px] pb-10 px-[16px] bg-cover"}>
      {/* background and profile */}
      <div
        className="jsu relative mt-1 flex h-28 w-full justify-center rounded-[20px] bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full bg-pink-400">
          <img className="h-full w-full rounded-full" src={profile} alt="" />
        </div>
      </div>
      {/* name and position */}
      <div className="mt-14 flex flex-col items-center">
        <h4 className="mt-1 text-xl font-bold text-navy-700 dark:text-white">
          Vlad Mihalache
        </h4>
        <div className="mt-2 flex items-center justify-center">
          <h6 className="mt-2 text-sm font-normal text-gray-600">
            Account type
          </h6>
          <select
            className="mt-2 px-2 text-sm font-bold text-navy-700 dark:!bg-navy-800 dark:text-white"
            name=""
            id=""
          >
            <option value="admin">Administrator</option>
            <option value="admin">Moderator</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
