import LineChart from "components/charts/LineChart";
import { lineChartDataSidebar } from "variables/charts";
import { lineChartOptionsSidebar } from "variables/charts";
import { BsArrowsAngleExpand } from "react-icons/bs";
const FreeCard = (props) => {
  const { mini, hovered } = props;
  return (
    <div
      className={`relative flex h-[300px] w-[240px] flex-col items-center rounded-[20px] bg-gradient-to-br from-brand-400 to-brand-600 ${
        mini === false
          ? ""
          : mini === true && hovered === true
          ? ""
          : "xl:mx-3.5 xl:justify-center"
      }`}
    >
      <BsArrowsAngleExpand
        className={`my-[100px] mx-5 h-6 w-6 text-white ${
          mini === true && hovered === false ? "block" : "hidden"
        }`}
      />
      <div
        className={`mt-8 flex flex-col items-center ${
          mini === false
            ? "block"
            : mini === true && hovered === true
            ? "block"
            : "hidden"
        }`}
      >
        <h4 className="text-2xl font-bold text-white">$3942.58</h4>
        <p className="mt-[4px] text-xs font-medium text-white">Total balance</p>
        <div className="mt-3 flex items-center justify-center rounded-[20px] bg-[#C9FBD5] py-1 px-2">
          <p className="text-xs font-bold text-green-500">+2.45%</p>
        </div>
      </div>

      {/* Sidebar Card */}
      <div
        className={`h-full w-full px-3 pb-3 ${
          mini === false
            ? "block"
            : mini === true && hovered === true
            ? "block"
            : "block xl:hidden"
        }`}
      >
        <LineChart
          chartData={lineChartDataSidebar}
          chartOptions={lineChartOptionsSidebar}
        />
      </div>
    </div>
  );
};

export default FreeCard;
