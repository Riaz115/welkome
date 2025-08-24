import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgress(props) {
  const { title, percentage } = props;

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      styles={buildStyles({
        rotation: 0.25,
        strokeLinecap: "round",
        textSize: "16px",
        pathTransitionDuration: 0.5,
        pathColor: "var(--color-500)",
        textColor: "#1B2559",
        trailColor: "#E9EDF7",
        backgroundColor: "var(--color-500)",
      })}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-sm font-medium text-gray-600">
          {title}
        </div>
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {percentage}%
        </div>
      </div>
    </CircularProgressbarWithChildren>
  );
}

export default CircularProgress;
