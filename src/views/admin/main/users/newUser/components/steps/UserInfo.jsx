import InputField from "components/fields/InputField";

const UserInfo = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        User Info
      </h4>

      {/* content */}

      <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField
          extra="mb-3"
          label="First Name"
          placeholder="eg. Esthera"
          id="name"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Last Name"
          placeholder="eg. Paterson"
          id="lastname"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Company"
          placeholder="eg. Simmple"
          id="company"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Email Address"
          placeholder="eg. hello@simmmple.com"
          id="email"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Password"
          placeholder="eg. 4043120241"
          id="password"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Confirm Password"
          placeholder="eg. 4043120241"
          id="confirm"
          type="text"
        />
      </div>
    </div>
  );
};

export default UserInfo;
