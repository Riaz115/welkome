import Card from "components/card";
import InputField from "components/fields/InputField";

const Social = () => {
  return (
    <Card extra={"w-full px-[20px] py-[20px]"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Social Profile
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can set user social profiles
        </p>
      </div>
      {/* inputs */}
      <div className="mt-7 grid grid-cols-1 gap-3">
        <InputField
          label="Twitter Username"
          placeholder="Twitter Username"
          id="username"
          type="text"
        />
        <InputField
          label="Facebook Username"
          placeholder="Facebook Username"
          id="username"
          type="text"
        />
        <InputField
          label="Github Username"
          placeholder="Github Username"
          id="username"
          type="text"
        />
        <InputField
          label="Dribbble Username"
          placeholder="Dribbble Username"
          id="username"
          type="text"
        />
      </div>
      {/* full width inputs */}
    </Card>
  );
};

export default Social;
