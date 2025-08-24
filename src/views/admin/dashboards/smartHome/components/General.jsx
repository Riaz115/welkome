// Assets
import Card from "components/card";
import Controller from "../components/Controller";
import {
  MdAcUnit,
  MdWifi,
  MdThermostat,
  MdOutlineLightbulb,
  MdOutlineLocationOn,
} from "react-icons/md";

const General = () => {
  // states of controller

  return (
    <Card extra={"flex flex-col w-full h-full relative p-4"}>
      {/* Header */}
      <h4 className="mt-[2px] mb-2.5 ml-px text-lg font-bold text-navy-700 dark:text-white">
        General Controller
      </h4>
      <div className="mb-3 flex items-center gap-1">
        <p className="text-gray-600">
          <MdOutlineLocationOn />
        </p>
        <select
          className="bg-none text-sm font-bold text-gray-600 dark:bg-navy-800"
          name=""
          id=""
        >
          <option value="dinner room">Dinner Room</option>
          <option value="living loom">Living Room</option>
          <option value="kitchen">Kitchen</option>
        </select>
      </div>
      {/* Main */}
      <div className="grid grid-cols-2 gap-[20px]">
        <Controller
          initial={false}
          text="Air Conditioner"
          onValue="ON"
          offValue="OFF"
          icon={<MdAcUnit />}
        />
        <Controller
          initial={true}
          text="Wi-Fi"
          onValue="Active"
          offValue="Inactive"
          icon={<MdWifi />}
        />
        <Controller
          initial={false}
          text="Thermostat"
          onValue="ON"
          offValue="OFF"
          icon={<MdThermostat />}
        />
        <Controller
          initial={false}
          text="Lights"
          onValue="ON"
          offValue="OFF"
          icon={<MdOutlineLightbulb />}
        />
      </div>
    </Card>
  );
};

export default General;
