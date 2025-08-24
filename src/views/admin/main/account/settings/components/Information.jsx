import Card from "components/card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

const Information = () => {
  return (
    <Card extra={"w-full !p-5"}>
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
      <div className="mt-7 mb-2 grid grid-cols-2 gap-3">
        <InputField
          label="Username"
          placeholder="@horizon.ui"
          id="username"
          type="text"
        />
        <InputField
          label="Email Address"
          placeholder="@horizon.ui"
          id="email"
          type="text"
        />
        <InputField
          label="First Name"
          placeholder="Vlad"
          id="firstname"
          type="text"
        />
        <InputField
          label="Last Name"
          placeholder="Mihalache"
          id="lastname"
          type="text"
        />
      </div>
      {/* full width inputs */}

      <InputField
        label="Job"
        placeholder="CTO"
        id="lastname"
        type="text"
        extra="mb-2"
      />
      <TextField
        label="About Me"
        placeholder="Tell something about yourself in 150 characters!"
        id="textarea"
        cols="30"
        rows="7"
      />
    </Card>
  );
};

export default Information;
