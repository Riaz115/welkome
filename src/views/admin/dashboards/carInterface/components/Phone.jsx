// Assets
import battery from "assets/img/dashboards/Battery.png";
import LineChart from "components/charts/LineAreaChart";
import Switch from "components/switch";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  lineChartDataAreaCarInterface,
  lineChartOptionsAreaCarInterface,
} from "variables/charts";
import {
  MdOutlineBrightness2,
  MdOutlineWbSunny,
  MdBluetooth,
} from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  MdLibraryMusic,
  MdLiveTv,
  MdLock,
  MdPhoneInTalk,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import { FaChild, FaFan } from "react-icons/fa";
import Card from "components/card";

const Phone = () => {
  const elipsMode = "https://i.ibb.co/Y3nrFfd/elipse-light.png";

  return (
    <Card className={"flex h-full w-full flex-col items-center"}>
      {/* Project status part */}
      <Card extra={"px-4 pt-3 pb-8 w-full"}>
        {/* Header */}
        <div className="mx-2 mt-2.5 flex items-center justify-between">
          <div className="ml-2 h-4">
            <img src={battery} alt="" />
          </div>
          <p className="ml-[0px] text-base font-medium text-gray-600 dark:text-white">
            657 Miles
          </p>
        </div>
        {/* Status */}
        <div className="mx-2 mt-11 flex w-full items-center justify-between">
          <div className="flex flex-col justify-center">
            {/* Sunny */}
            <div className="flex items-center gap-1">
              <Switch id="switch" />
              <label
                for="switch"
                className="text-xl font-medium text-gray-600 dark:text-white"
              >
                <MdOutlineWbSunny />
              </label>
            </div>

            {/* Moon */}
            <div
              className={`mt-1 flex items-center gap-1 bg-cover bg-no-repeat bg-[${elipsMode}]`}
            >
              <Switch id="switch2" />
              <label
                for="switch2"
                className="text-xl font-medium text-gray-600 dark:text-white"
              >
                <MdOutlineBrightness2 />
              </label>
            </div>
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center">
            <div className="ml-5 w-full bg-ellispisModeCarInterface bg-center bg-no-repeat dark:bg-ellispisModeCarInterfaceDark sm:w-[200px]">
              <LineChart
                chartData={lineChartDataAreaCarInterface}
                chartOptions={lineChartOptionsAreaCarInterface}
              />
              <p className="text-center font-medium text-gray-600 dark:text-white">
                Hello, how can I help?
              </p>
            </div>
          </div>

          {/* bluetooth */}
          <div className="flex items-center justify-end pl-2 pr-2">
            <p className="mr-2 text-xl text-gray-600 dark:text-white">
              <MdBluetooth />
            </p>
            <p className="w-min text-center text-base font-normal text-gray-600 dark:text-white">
              Esthera’s Iphone
            </p>
          </div>
        </div>
      </Card>

      {/* Card with icons */}
      <div className="mt-5 grid w-full grid-cols-3 gap-5">
        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <FaChild className="h-10 w-10" />
        </Card>
        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <MdLock className="h-10 w-10" />
        </Card>
        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <MdLibraryMusic className="h-10 w-10" />
        </Card>
        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <FaFan className="h-10 w-10" />
        </Card>

        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <MdLiveTv className="h-10 w-10" />
        </Card>

        <Card
          extra={
            "flex items-center justify-center py-12 w-full text-4xl text-gray-700"
          }
        >
          <MdPhoneInTalk className="h-10 w-10" />
        </Card>
      </div>
      {/* left & right */}
      <div className="mt-5 grid w-full grid-cols-2 gap-5 font-medium text-gray-600">
        <Card
          extra={
            "flex flex-col items-center justify-center text-4xl w-full py-14"
          }
        >
          <BiChevronUp className="h-6 w-6 text-gray-700 dark:text-white" />
          <div className="relative flex items-center text-gray-600 dark:text-white">
            <MdChevronLeft className="h-6 w-6 text-gray-700 dark:text-white" />
            <svg
              width="44"
              height="29"
              viewBox="0 0 44 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.60578 4.03976L37.6058 1.50885C40.5135 1.27887 43 3.57645 43 6.49328V22.5067C43 25.4235 40.5135 27.7211 37.6058 27.4912L5.60577 24.9602C3.00536 24.7546 1 22.5843 1 19.9758V9.0242C1 6.41566 3.00536 4.24543 5.60578 4.03976Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>

            <span className="absolute left-10 text-lg font-bold text-gray-700 dark:text-white">
              L
            </span>
            <MdChevronRight className="h-6 w-6 text-gray-700 dark:text-white" />
          </div>
          <BiChevronDown className="h-6 w-6 text-gray-700 dark:text-white" />
        </Card>
        {/* right */}
        <Card
          extra={
            "flex flex-col items-center justify-center text-4xl w-full py-14"
          }
        >
          <BiChevronUp className="h-6 w-6 text-gray-700 dark:text-white" />
          <div className="relative flex items-center text-gray-700 dark:text-white">
            <MdChevronLeft className="h-6 w-6 text-gray-700 dark:text-white" />
            <svg
              width="44"
              height="29"
              viewBox="0 0 44 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43 9.0242C43 6.41566 40.9946 4.24543 38.3942 4.03976L6.39422 1.50885C3.48647 1.27887 1 3.57645 1 6.49328V22.5067C1 25.4235 3.48648 27.7211 6.39422 27.4912L38.3942 24.9602C40.9946 24.7546 43 22.5843 43 19.9758V9.0242Z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>

            <span className="absolute left-11 text-lg font-bold text-gray-700 dark:text-white">
              R
            </span>
            <MdChevronRight className="h-6 w-6 text-gray-700 dark:text-white" />
          </div>
          <BiChevronDown className="h-6 w-6 text-gray-700 dark:text-white" />
        </Card>
      </div>

      {/* Slider */}

      <Card
        extra={
          "flex items-center px-16 justify-center h-full w-full mt-5 min-h-[130px]"
        }
      >
        <div className="flex w-full items-center justify-center gap-5">
          <span className="text-3xl text-gray-700 dark:text-white">
            <MdOutlineWbSunny />
          </span>

          <Slider
            handleStyle={{
              borderColor: "#E0E5F2",
              height: 18,
              width: 18,
              marginLeft: 1,
              marginTop: -8,
              cursor: "pointer",

              backgroundColor: "white",
            }}
            railStyle={{ backgroundColor: "#E0E5F2", cursor: "pointer" }}
            trackStyle={{ backgroundColor: "#707EAE", cursor: "pointer" }}
            dotStyle={{ backgroundColor: "red" }}
          />
        </div>
      </Card>
    </Card>
  );
};

export default Phone;
