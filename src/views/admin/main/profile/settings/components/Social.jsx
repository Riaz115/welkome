import Card from "components/card";
import InputField from "components/fields/InputField";

const Social = () => {
  return (
    <Card extra={"w-full px-6 py-6"}>
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
      <div className="mt-11 grid grid-cols-1 gap-3">
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

        {/* button */}
        <div className="mt-3 flex w-full justify-end">
          <button className="rounded-xl bg-brand-500 px-8 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Save changes
          </button>
        </div>
      </div>
      {/* full width inputs */}
    </Card>
  );
};

export default Social;
