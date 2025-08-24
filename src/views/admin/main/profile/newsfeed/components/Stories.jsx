import { Scrollbars } from "react-custom-scrollbars-2";

// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar10 from "assets/img/avatars/avatar10.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import SeeStory from "components/actions/SeeStory";
import { MdAdd } from "react-icons/md";
import storyImage from "assets/img/profile/storyImage.png";

const Stories = () => {
  return (
    <div className="rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none lg:justify-between">
      <Scrollbars
        autoHide
        style={{ width: "100", height: 128, borderRadius: 30 }}
      >
        <div className="flex h-[128px] w-full items-center gap-[30px] px-8 py-4">
          <div className="mb-1 flex cursor-pointer flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#FF5E62] p-px text-2xl text-navy-700 dark:text-white">
              <MdAdd />
            </div>
            <p className="mt-[8px] text-sm font-medium dark:text-white">
              Add Story
            </p>
          </div>
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Alexander"
            photo={avatar2}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Perdana"
            photo={avatar1}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Sumesh"
            photo={avatar8}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Esthera"
            photo={avatar4}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Louis"
            photo={avatar5}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Roberto"
            photo={avatar6}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Su Jeo"
            photo={avatar10}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Antonia"
            photo={avatar3}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Markus"
            photo={avatar9}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Su Jeo"
            photo={avatar10}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Louis"
            photo={avatar5}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Robert"
            photo={avatar8}
          />
          <SeeStory
            content={
              <img className="z-[99] rounded-2xl" src={storyImage} alt="" />
            }
            name="Zobar"
            photo={avatar10}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Stories;
