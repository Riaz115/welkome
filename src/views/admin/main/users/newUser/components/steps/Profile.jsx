import TextField from "components/fields/TextField";
import InputField from "components/fields/InputField";
const Profile = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Profile
      </h4>
      {/* inputs */}
      <div className="mt-4">
        <InputField
          label="Profile Email"
          placeholder="Your primary email address"
          id="email"
        />
      </div>
      <div className="mt-2">
        <TextField
          label="Bio"
          placeholder="Enter a few words about you!"
          id="textarea"
          cols="30"
          rows="8"
        />
      </div>
    </div>
  );
};

export default Profile;
