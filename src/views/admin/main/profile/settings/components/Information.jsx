import Card from "components/card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

const Information = () => {
  return (
    <Card extra={"w-full mt-3 px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Account Settings
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can change user account information
        </p>
      </div>
      {/* inputs */}
      <div className="mt-[37px] grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField
          extra="mb-3"
          label="User Name"
          placeholder="@john123"
          id="username"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Email Address"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Frist Name"
          placeholder="John"
          id="firstname"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Last Name"
          placeholder="Doe"
          id="lastname"
          type="text"
        />
      </div>
      {/* full width inputs */}
      <InputField
        extra="mb-3"
        label="Job"
        placeholder="Web Developer"
        id="job"
        type="text"
      />

      <TextField
        extra="mb-4"
        label="About Me"
        placeholder="Tell something about yourself in 150 characters!"
        id="textarea"
        cols="30"
        rows="5"
      />
      <div className="flex w-full justify-end">
        <button className="rounded-xl bg-brand-500 px-8 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Save Changes
        </button>
      </div>
    </Card>
  );
};

export default Information;
