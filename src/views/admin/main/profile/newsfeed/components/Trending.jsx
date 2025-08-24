// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar10 from "assets/img/avatars/avatar10.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import image1 from "assets/img/profile/image1.png";
import image2 from "assets/img/profile/image2.png";
import image3 from "assets/img/profile/image3.png";
import image4 from "assets/img/profile/image4.png";
import image5 from "assets/img/profile/image5.png";
import image6 from "assets/img/profile/image6.png";
import Follow from "components/actions/Follow";
import Card from "components/card";

const Trending = () => {
  return (
    <Card extra={"w-full h-full pt-3 pb-4 px-[20px]"}>
      {/* Trending */}
      <h4 className="mb-4 pt-1 text-lg font-bold text-navy-700 dark:text-white">
        Trending Feeds
      </h4>
      <div className="grid w-full grid-cols-3 gap-2">
        <div>
          <img src={image1} className="rounded-lg" alt="" />
        </div>
        <div>
          <img src={image2} className="rounded-lg" alt="" />
        </div>
        <div>
          <img src={image3} className="rounded-lg" alt="" />
        </div>
        <div>
          <img src={image4} className="rounded-lg" alt="" />
        </div>
        <div>
          <img src={image5} className="rounded-lg" alt="" />
        </div>
        <div>
          <img src={image6} className="rounded-lg" alt="" />
        </div>
      </div>
      {/* Suggestions */}
      <div className="mt-9">
        <h4 className="mb-[22px] text-lg font-bold text-navy-700 dark:text-white">
          Suggestions for you
        </h4>
        <Follow
          mb=" mb-[26px] "
          name="Dragos Markus"
          username="@dragos_markus024"
          photo={avatar1}
        />
        <Follow
          mb=" mb-[26px]"
          name="Emily James"
          username="@james.cox.official"
          photo={avatar9}
        />
        <Follow
          mb=" mb-[26px]"
          name="Iaon Dint"
          username="@iaondint_0943"
          photo={avatar2}
        />
        <Follow
          mb=" mb-[26px]"
          name="William Jackson"
          username="@wllm.jackson"
          photo={avatar10}
        />
        <Follow
          mb=" mb-[26px]"
          name="Marius Ionescu"
          username="@marius_balauru97"
          photo={avatar7}
        />
      </div>
      <h4 className="mt-10 text-lg font-bold text-navy-700 dark:text-white">
        Profile Activity
      </h4>
      <div className="mt-[20px] w-full rounded-[20px] bg-lightPrimary p-6 dark:!bg-navy-700">
        <div className="flex flex-row-reverse flex-wrap justify-end p-1">
          <img
            src={avatar1}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar2}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar3}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar4}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar5}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar6}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar7}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
          <img
            src={avatar6}
            className="-mr-2.5 h-10 w-10 rounded-full border-[3px] border-white dark:!border-none"
            alt=""
          />
        </div>

        <div className="mt-[20px] xl:mt-6">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            2,9k Followers Active
          </h4>
          <p className="mt-[12px] pr-2 text-base text-gray-700 dark:text-white">
            Now is the perfect time for uploading your new social media post!{" "}
            <a
              className="font-medium text-brand-500  dark:text-white "
              href=" "
            >
              {" "}
              Create a new post!
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Trending;
