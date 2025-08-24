/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/components/SidebarCard";
import {
  renderThumb,
  renderTrack,
  renderView,
  renderViewMini,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import avatar4 from "assets/img/avatars/avatar4.png";
import Card from "components/card";

function SidebarHorizon(props) {
  const { open, onClose, variant, mini, hovered, setHovered } = props;
  
  return (
    <div
      className={`sm:none ${
        mini === false
          ? "w-[285px]"
          : mini === true && hovered === true
          ? "w-[285px]"
          : "w-[285px] xl:!w-[120px]"
      } duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        variant === "auth" ? "xl:hidden" : "xl:block"
      } ${open ? "" : "-translate-x-[105%]"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        extra={`ml-3 w-full h-[96.5vh] sm:mr-4 sm:my-4 m-7 !rounded-[20px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={
            mini === false
              ? renderView
              : mini === true && hovered === true
              ? renderView
              : renderViewMini
          }
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 right-4 block cursor-pointer xl:hidden"
                onClick={onClose}
              >
                <HiX />
              </span>
              <div className={`ml-[52px] mt-[44px] flex items-center `}>
                <div
                  className={`mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white flex items-center gap-2 ${
                    mini === false
                      ? "block"
                      : mini === true && hovered === true
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <img 
                    src="/logo.png" 
                    alt="Welkome Logo" 
                    className="h-8 w-8 object-contain"
                  />
                  Welkome 
                </div>
                <div
                  className={`mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white flex items-center justify-center ${
                    mini === false
                      ? "hidden"
                      : mini === true && hovered === true
                      ? "hidden"
                      : "block"
                  }`}
                >
                  <img 
                    src="/logo.png" 
                    alt="Welkome Logo" 
                    className="h-8 w-8 object-contain"
                  />
                </div>
              </div>
              <div className="mt-[58px] mb-7 h-px bg-gray-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul>
                <Links mini={mini} hovered={hovered} />
              </ul>
            </div>
            {/* Free Horizon Card    */}
            <div className="mt-[28px] mb-[30px]">
              {/* <div className="flex justify-center">
                <SidebarCard mini={mini} hovered={hovered} />
              </div> */}
              {/* Sidebar profile info */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-200">
                  <img src={avatar4} className="rounded-full" alt="avatar" />
                </div>
                <div
                  className={`ml-1 ${
                    mini === false
                      ? "block"
                      : mini === true && hovered === true
                      ? "block"
                      : "block xl:hidden"
                  }`}
                >
                  <h4 className="text-base font-bold text-navy-700 dark:text-white">
                    Lawrence
                  </h4>
                  <p className="text-sm font-medium text-gray-600">
                    Product Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default SidebarHorizon;