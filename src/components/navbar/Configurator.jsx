// Chakra Imports
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useState } from "react";
import Light from "assets/img/layout/Light.png";
import Dark from "assets/img/layout/Dark.png";
import ContrastBlock from "assets/img/layout/ContrastBlock.png";
import ContrastBlockDark from "assets/img/layout/ContrastBlockDark.png";
import DefaultSidebar from "assets/img/layout/DefaultSidebar.png";
import DefaultSidebarDark from "assets/img/layout/DefaultSidebarDark.png";
import MiniSidebar from "assets/img/layout/MiniSidebar.png";
import MiniSidebarDark from "assets/img/layout/MiniSidebarDark.png";
// Assets
import {
  MdSettings,
  MdFullscreen,
  MdOutlineFullscreenExit,
  MdRefresh,
} from "react-icons/md";
import ConfiguratorRadio from "./ConfiguratorRadio";
export default function HeaderLinks(props) {
  const { theme, setTheme, darkmode, setDarkmode } = props;
  //eslint-disable-next-line
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [active, setActive] = useState("Purple");
  const [contrast, setContrast] = useState(false);
  const btnRef = React.useRef();
  // const [fullscreen, setFullscreen] = useState(false);
  // Chakra Color Mode
  const resetTheme = () => {
    const newTheme = {
      "--shadow-100": "rgba(112, 144, 176, 0.08)",
      "--background-100": "#FFFFFF",
      "--background-900": "#0b1437",
      "--color-50": "#E9E3FF",
      "--color-100": "#C0B8FE",
      "--color-200": "#A195FD",
      "--color-300": "#8171FC",
      "--color-400": "#7551FF",
      "--color-500": "#422AFB",
      "--color-600": "#3311DB",
      "--color-700": "#2111A5",
      "--color-800": "#190793",
      "--color-900": "#11047A",
    };
    setTheme(newTheme);
  };
  const changeThemeGreen = () => {
    const newTheme = {
      "--color-50": "#E1FFF4",
      "--color-100": "#BDFFE7",
      "--color-200": "#7BFECE",
      "--color-300": "#39FEB6",
      "--color-400": "#01F99E",
      "--color-500": "#01B574",
      "--color-600": "#01935D",
      "--color-700": "#016B44",
      "--color-800": "#00472D",
      "--color-900": "#002417",
    };
    setTheme(newTheme);
  };
  const changeThemeOrange = () => {
    const newTheme = {
      "--color-50": "#FFF7EB",
      "--color-100": "#FFF1DB",
      "--color-200": "#FFE2B8",
      "--color-300": "#FFD28F",
      "--color-400": "#FFC46B",
      "--color-500": "#FFB547",
      "--color-600": "#FF9B05",
      "--color-700": "#C27400",
      "--color-800": "#855000",
      "--color-900": "#422800",
      "--color-950": "#1F1200",
    };
    setTheme(newTheme);
  };
  const changeThemeRed = () => {
    const newTheme = {
      "--color-50": "#FCE8E8",
      "--color-100": "#FAD1D1",
      "--color-200": "#F4A4A4",
      "--color-300": "#EF7676",
      "--color-400": "#EA4848",
      "--color-500": "#E31A1A",
      "--color-600": "#B71515",
      "--color-700": "#891010",
      "--color-800": "#5B0B0B",
      "--color-900": "#2E0505",
      "--color-950": "#170303",
    };
    setTheme(newTheme);
  };
  const changeThemeBlue = () => {
    const newTheme = {
      "--color-50": "#EBEFFF",
      "--color-100": "#D6DFFF",
      "--color-200": "#ADBFFF",
      "--color-300": "#8AA3FF",
      "--color-400": "#6183FF",
      "--color-500": "#3965FF",
      "--color-600": "#0036FA",
      "--color-700": "#0029BD",
      "--color-800": "#001B7A",
      "--color-900": "#000D3D",
      "--color-950": "#00071F",
    };
    setTheme(newTheme);
  };
  const changeThemeTeal = () => {
    const newTheme = {
      "--color-50": "#EBFAF8",
      "--color-100": "#D7F4F2",
      "--color-200": "#AAE9E4",
      "--color-300": "#82DED6",
      "--color-400": "#59D4C9",
      "--color-500": "#33C3B7",
      "--color-600": "#299E94",
      "--color-700": "#1F756E",
      "--color-800": "#144D48",
      "--color-900": "#0B2826",
      "--color-950": "#051413",
    };
    setTheme(newTheme);
  };
  const changeThemeBrand = () => {
    const newTheme = {
      "--color-50": "#EFEBFF",
      "--color-100": "#E9E3FF",
      "--color-200": "#422AFB",
      "--color-300": "#422AFB",
      "--color-400": "#7551FF",
      "--color-500": "#422AFB",
      "--color-600": "#3311DB",
      "--color-700": "#02044A",
      "--color-800": "#190793",
      "--color-900": "#11047A",
    };
    setTheme(newTheme);
  };
  const changeBgDefault = () => {
    let newTheme = theme;
    newTheme = {
      "--shadow-100": "rgba(112, 144, 176, 0.08)",
      "--background-100": "#FFFFFF",
      "--background-900": "#0b1437",
    };
    setTheme(newTheme);
  };
  const changeBgContrast = () => {
    let newTheme = theme;
    newTheme = {
      "--shadow-100": "transparent",
      "--background-100": "#F4F7FE",
      "--background-900": "#070f2e",
    };
    setTheme(newTheme);
  };
  useEffect(() => {
    if (theme["--color-500"] === "#01B574") {
      setActive("Green");
    } else if (theme["--color-500"] === "#FFB547") {
      setActive("Orange");
    } else if (theme["--color-500"] === "#E31A1A") {
      setActive("Red");
    } else if (theme["--color-500"] === "#3965FF") {
      setActive("Blue");
    } else if (theme["--color-500"] === "#33C3B7") {
      setActive("Teal");
    } else {
      setActive("Purple");
    }
  }, [theme]);
  useEffect(() => {
    if (theme["--background-100"] === "#FFFFFF") {
      setContrast(false);
    } else {
      setContrast(true);
    }
  }, [theme]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  return (
    <>
      <button
        ref={btnRef}
        className="h-[18px] min-h-[unset] w-max min-w-[unset] bg-none p-0"
        onClick={onOpen}
      >
        <MdSettings className="h-[18px] w-[18px] text-gray-400 dark:text-white" />
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
      >
        <DrawerContent className="my-4 ml-0 mr-4 w-[calc(100vw_-_32px)] max-w-[calc(100vw_-_32px)] rounded-2xl bg-white shadow-[-20px_17px_40px_4px_rgba(112,_144,_176,_0.18)] dark:bg-navy-800 dark:shadow-[-22px_32px_51px_4px_#0B1437] sm:ml-4 md:w-[400px] md:max-w-[400px]">
          <DrawerHeader
            px="28px"
            w={{ base: "100%", md: "400px" }}
            pt="24px"
            pb="0px"
          >
            <div
              className="absolute top-[13px] right-[50px] cursor-pointer"
              onClick={() => {
                resetTheme();
                props.setMini(false);
              }}
            >
              <MdRefresh className="h-[22px] w-[22px] text-gray-900 dark:text-white" />
            </div>
            <DrawerCloseButton className="absolute right-[26px] top-[16px] h-4 w-4 text-gray-900 dark:text-white" />
            <div className="flex items-center">
              <div className="mr-5 flex h-12 w-12 rounded-full bg-gradient-to-b from-brand-400 to-brand-600">
                <img alt="" src="/logo.png" className="h-full w-full rounded-full object-cover" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  Configurator
                </p>
              </div>
            </div>
            <div className="my-[30px] h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </DrawerHeader>
          <DrawerBody
            overflowY="scroll"
            px="28px"
            pt="0px"
            pb="24px"
            w={{ base: "100%", md: "400px" }}
            maxW="unset"
          >
            <div className="flex flex-col">
              <p className="mb-3 font-bold text-gray-900 dark:text-white">
                Color Mode
              </p>
              <div className="mb-7 flex w-full justify-between gap-5">
                <ConfiguratorRadio
                  onClick={() => {
                    if (darkmode) {
                      document.body.classList.remove("dark");
                      setDarkmode(false);
                    }
                  }}
                  active={
                    document.body.classList.contains("dark") ? false : true
                  }
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Light
                    </p>
                  }
                >
                  <img
                    className="max-w-[130px] rounded-lg"
                    alt=""
                    src={Light}
                  />
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={() => {
                    if (!darkmode) {
                      document.body.classList.add("dark");
                      setDarkmode(true);
                    }
                  }}
                  active={
                    !document.body.classList.contains("dark") ? false : true
                  }
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Dark
                    </p>
                  }
                >
                  <img className="max-w-[130px] rounded-lg" alt="" src={Dark} />
                </ConfiguratorRadio>
              </div>
              <p className="mb-3 font-bold text-gray-900 dark:text-white">
                Contrast
              </p>
              <div className="mb-7 flex w-full justify-between gap-5">
                <ConfiguratorRadio
                  onClick={() => changeBgDefault()}
                  active={contrast === true ? false : true}
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Transparent
                    </p>
                  }
                >
                  <div
                    className={`flex max-w-[144px] overflow-hidden rounded-[10px] border-[1px] border-gray-100 bg-[url(assets/img/layout/Contrast.png)] bg-repeat pt-2.5 pl-2.5 dark:border-[#323B5D] dark:bg-[url(assets/img/layout/ContrastDark.png)]`}
                  >
                    <img
                      className="mt-auto shadow-[0px_6px_14px_rgba(200,_207,_215,_0.6)] dark:shadow-none"
                      src={
                        document.body.classList.contains("dark")
                          ? ContrastBlockDark
                          : ContrastBlock
                      }
                      alt=""
                    />
                  </div>
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={() => changeBgContrast()}
                  active={contrast === false ? false : true}
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Filled
                    </p>
                  }
                >
                  <div
                    className={`flex max-w-[144px] overflow-hidden rounded-[10px] border-[1px] border-gray-200 bg-gray-100 bg-repeat pt-2.5 pl-2.5 dark:border-[#323B5D] dark:bg-navy-900`}
                  >
                    <img
                      className="mt-auto shadow-[0px_6px_14px_rgba(200,_207,_215,_0.6)] dark:shadow-none"
                      alt=""
                      src={
                        document.body.classList.contains("dark")
                          ? ContrastBlockDark
                          : ContrastBlock
                      }
                    />
                  </div>
                </ConfiguratorRadio>
              </div>
              <p className="mb-3 font-bold text-gray-900 dark:text-white">
                Sidebar
              </p>
              <div className="mb-7 flex w-full justify-between gap-5">
                <ConfiguratorRadio
                  onClick={() => props.setMini(false)}
                  active={props.mini === true ? false : true}
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Default
                    </p>
                  }
                >
                  <div
                    className={`flex min-h-[126px] w-[130px] items-center justify-center overflow-hidden rounded-[10px] border-[1px] border-gray-200 bg-gray-100 bg-repeat pt-2.5 pl-2.5 dark:border-[#323B5D] dark:bg-navy-900`}
                  >
                    <img
                      className="max-w-full shadow-[0px_6px_14px_rgba(200,_207,_215,_0.6)] dark:shadow-none md:max-w-[96px]"
                      alt=""
                      src={
                        document.body.classList.contains("dark")
                          ? DefaultSidebarDark
                          : DefaultSidebar
                      }
                    />
                  </div>
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={() => props.setMini(true)}
                  active={props.mini === false ? false : true}
                  label={
                    <p className="font-bold text-gray-900 dark:text-white">
                      Minimized
                    </p>
                  }
                >
                  <div
                    className={`flex min-h-[126px] w-[130px] items-center justify-center overflow-hidden rounded-[10px] border-[1px] border-gray-200 bg-gray-100 bg-repeat pt-2.5 pl-2.5 dark:border-[#323B5D] dark:bg-navy-900`}
                  >
                    <img
                      className="max-w-full shadow-[0px_6px_14px_rgba(200,_207,_215,_0.6)] dark:shadow-none md:max-w-[75px]"
                      alt=""
                      src={
                        document.body.classList.contains("dark")
                          ? MiniSidebarDark
                          : MiniSidebar
                      }
                    />
                  </div>
                </ConfiguratorRadio>
              </div>
              <p className="mb-3 font-bold text-gray-900 dark:text-white">
                Color presets
              </p>
              <div className="flex w-full flex-wrap justify-between gap-5">
                <button
                  onClick={() => changeThemeBrand()}
                  className={`flex h-max w-[95px] items-center justify-center rounded-2xl border-[1px] lg:w-[96px] ${
                    active === "Purple"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonPurple-500 shadow-[0px_6px_18px_rgba(67,_24,_255,_0.5)] dark:bg-horizonPurple-400 dark:shadow-[0px_6px_18px_(117,_81,_255,_0.5)]" />
                </button>
                <button
                  onClick={() => changeThemeGreen()}
                  className={`flex h-max w-[95px] items-center justify-center border-[1px] lg:w-[96px] ${
                    active === "Green"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } rounded-2xl border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonGreen-500 shadow-[0px_6px_18px_rgba(1,_181,_116,_0.5)] dark:bg-horizonGreen-400 dark:shadow-[0px_6px_18px_rgba(53,_210,_138,_0.5)]" />
                </button>
                <button
                  onClick={() => changeThemeOrange()}
                  className={`flex h-max w-[95px] items-center justify-center border-[1px] lg:w-[96px] ${
                    active === "Orange"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } rounded-2xl border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonOrange-500 shadow-[0px_6px_18px_rgba(255,_181,_71,_0.5)] dark:bg-horizonOrange-400 dark:shadow-[0px_6px_18px_rgba(255,_181,_71,_0.5)]" />
                </button>
                <button
                  onClick={() => changeThemeRed()}
                  className={`flex h-max w-[95px] items-center justify-center border-[1px] lg:w-[96px] ${
                    active === "Red"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } rounded-2xl border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonRed-500 shadow-[0px_6px_18px_rgba(227,_26,_26,_0.5)] dark:bg-horizonRed-400 dark:shadow-[0px_6px_18px_rgba(227,_26,_26,_0.5)]" />
                </button>
                <button
                  onClick={() => changeThemeBlue()}
                  className={`flex h-max w-[95px] items-center justify-center border-[1px] lg:w-[96px] ${
                    active === "Blue"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } rounded-2xl border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonBlue-500 shadow-[0px_6px_18px_rgba(57,_101,_255,_0.5)] dark:bg-horizonBlue-400 dark:shadow-[0px_6px_18px_rgba(57,_101,_255,_0.5)]" />
                </button>
                <button
                  onClick={() => changeThemeTeal()}
                  className={`flex h-max w-[95px] items-center justify-center border-[1px] lg:w-[96px] ${
                    active === "Teal"
                      ? "bg-white dark:bg-navy-700"
                      : "bg-transparent"
                  } rounded-2xl border-gray-200 bg-[rgba(11,11,11,0)] py-4 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none`}
                >
                  <div className="flex h-5 w-5 rounded-full bg-horizonTeal-500 shadow-[0px_6px_18px_rgba(51,_195,_183,_0.5)] dark:bg-horizonTeal-400 dark:shadow-[0px_6px_18px_rgba(51,_195,_183,_0.5)]" />
                </button>
              </div>
            </div>
            <div className="my-[30px] h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <button
              className="text-md flex h-max w-full items-center justify-center rounded-2xl border-[1px] border-gray-200 bg-[rgba(11,11,11,0)] py-4 font-bold text-gray-900 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:border-white/20 dark:text-white hover:dark:bg-navy-700 hover:dark:shadow-none focus:dark:bg-navy-700 focus:dark:shadow-none active:dark:bg-white/10 active:dark:shadow-none"
              onClick={() => {
                isFullscreen
                  ? document.exitFullscreen()
                  : document.body.requestFullscreen();
              }}
            >
              {isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
              {isFullscreen ? (
                <MdOutlineFullscreenExit className="ml-1.5 h-[18px] w-[18px] text-gray-900 dark:text-white" />
              ) : (
                <MdFullscreen className="ml-1.5 h-[18px] w-[18px] text-gray-900 dark:text-white" />
              )}
            </button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
