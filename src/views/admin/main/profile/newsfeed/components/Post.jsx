import postImage from "assets/img/profile/postImage.png";
import avatar10 from "assets/img/avatars/avatar10.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import CardMenu from "components/card/CardMenu";
// Assets
import { FaRegCommentDots } from "react-icons/fa";
import {} from "react-icons/io";
import {
  MdOutlineFavoriteBorder,
  MdShare,
  MdBookmarkBorder,
  MdOutlineAttachment,
  MdOutlineTagFaces,
  MdImage,
} from "react-icons/md";
import Card from "components/card";

const Post = () => {
  return (
    <Card extra={"w-full h-full px-[30px] py-[21px]"}>
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-[13px]">
          <div className="h-14 w-14 rounded-full border-[3px] border-[#FF9966] bg-white p-[2px]">
            <img src={avatar10} className="h-full w-full rounded-full" alt="" />
          </div>
          <div className="mt-px">
            <h5 className="mb-[4px] text-[17px] font-bold text-navy-700 dark:text-white">
              Esthera William
            </h5>
            <p className="text-sm font-medium text-gray-600">
              @esthera.william
            </p>
          </div>
        </div>
        {/* Right side */}
        <CardMenu />
      </div>

      {/* Content */}

      <div>
        <div className="mt-[44px] h-full w-full rounded-xl sm:h-full">
          <img src={postImage} className="h-full w-full rounded-xl" alt="" />
        </div>

        {/* Likes and comments */}

        <div className="px-3">
          {/* likes */}
          <div className="flex items-center justify-between border-b border-gray-200 py-[30px] dark:border-white/10">
            <div className="flex items-center gap-1 text-base font-medium text-navy-700 dark:text-white">
              <p className="text-lg">
                <MdOutlineFavoriteBorder />
              </p>
              <p>
                28.5k <span className="hidden md:inline"> Likes </span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-base font-medium text-navy-700 dark:text-white">
              <p className="text-lg">
                <FaRegCommentDots />
              </p>
              34 <span className="hidden md:inline"> Likes </span>
            </div>
            <div className="flex items-center gap-1 text-base font-medium text-navy-700 dark:text-white">
              <p className="text-lg">
                <MdShare />
              </p>
              156 <span className="hidden md:inline"> Shares </span>
            </div>
            <div className="flex items-center gap-1 text-base font-medium text-navy-700 dark:text-white">
              <p className="text-lg">
                <MdBookmarkBorder />
              </p>
              20 <span className="hidden md:inline"> Saves </span>
            </div>
          </div>

          {/* Comments section */}

          <div className="mt-6 flex w-full justify-between gap-3">
            <div className="h-[50px] w-[53px] rounded-full">
              <img
                src={avatar10}
                className="h-full w-full rounded-full"
                alt=""
              />
            </div>
            <div className="mt-2 w-full text-base">
              <div className="w-full gap-2">
                <p className="text-base text-navy-700 dark:text-white">
                  <span className="text-base font-bold text-navy-700 dark:text-white">
                    @esthera.william{" "}
                  </span>
                  I always felt like I could do anything. That’s the main thing
                  people are controlled by! Thoughts- their perception of
                  themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you won’t
                  do anything. I was taught I could do everything
                </p>
              </div>
              <p className="mt-1 cursor-pointer text-base text-gray-600">
                #photography #portrait #image
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-base text-gray-600">24 min ago</p>
                <p className="font-medium text-navy-700 hover:cursor-pointer dark:text-white">
                  Reply
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-between gap-3">
            <div className="h-[50px] w-[53px] rounded-full">
              <img
                src={avatar2}
                className="h-full w-full rounded-full"
                alt=""
              />
            </div>
            <div className="mt-2 w-full text-base">
              <div className="w-full gap-2">
                <p className="text-base text-navy-700 dark:text-white">
                  <span className="text-base font-bold text-navy-700 dark:text-white">
                    @roberto.michael91{" "}
                  </span>
                  Wow! This is an amazing point of view! The time is now for it
                  to be okay to be great! 🙏🏼
                </p>
              </div>
              <p className="cursor-pointer text-base text-gray-600"> </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-base text-gray-600">21 min ago</p>
                <p className="font-medium text-navy-700 hover:cursor-pointer dark:text-white">
                  Reply
                </p>
              </div>
            </div>
          </div>

          {/* Write comments */}

          <div className="mb-4 mt-10 flex w-full items-center justify-between gap-3">
            <div className="h-[50px] w-[50px] rounded-full">
              <img
                src={avatar4}
                className="h-full w-full rounded-full"
                alt=""
              />
            </div>
            <div className="flex h-[50px] w-full items-center rounded-full bg-lightPrimary pr-3 dark:border dark:!border-white/10 dark:!bg-navy-800">
              <input
                placeholder="Write your comment...."
                className="h-full w-full rounded-full bg-lightPrimary px-4 text-sm text-navy-700 outline-none dark:!bg-navy-800 dark:text-white"
                type="text"
              />
              <div className="flex items-center gap-4">
                <p className="text-xl text-gray-600 hover:cursor-pointer">
                  <MdOutlineAttachment />
                </p>
                <p className="text-xl text-gray-600 hover:cursor-pointer">
                  <MdOutlineTagFaces />
                </p>

                <p className="text-xl text-gray-600 hover:cursor-pointer">
                  <MdImage />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
