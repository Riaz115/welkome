import Card from "components/card";
import InputField from "components/fields/InputField";

const Password = () => {
  return (
    <Card extra={"w-full p-4"}>
      {/* Header */}
      <div className="w-full px-2">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Change Password
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can set your new password
        </p>
      </div>
      {/* inputs */}
      <div className="mt-7 grid grid-cols-1 gap-3">
        <InputField
          label="Old Password"
          placeholder="Your Old Password"
          id="username"
          type="text"
        />
        <InputField
          label="New Password"
          placeholder="Your New Password"
          id="username"
          type="text"
        />
        <InputField
          label="New Password Confirmation"
          placeholder="Confirm New Password"
          id="username"
          type="text"
        />

        <div className="mt-12 flex w-full justify-end">
          <button className="rounded-xl bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Change Password
          </button>
        </div>
      </div>
      {/* full width inputs */}
    </Card>
  );
};

export default Password;
