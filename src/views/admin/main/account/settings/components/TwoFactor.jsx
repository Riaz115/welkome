import SetUp from "components/actions/SetUp";
import Card from "components/card";

const TwoFactor = () => {
  return (
    <Card extra={"w-full px-8 py-8"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Two-Factor Authentication
        </h4>
        <div className="mt-1 flex items-center justify-center rounded-[10px] bg-green-100 px-3 py-1 text-sm font-bold uppercase text-green-500 dark:bg-green-50">
          Enabled
        </div>
      </div>
      {/* content */}
      <SetUp
        name="Authenticator App"
        value="Not configured"
        actionName="Set up"
        py="py-6"
        border="border-b"
      />
      <SetUp
        py="py-6"
        border="border-b"
        name="Security Keys"
        value="Not keys added"
        actionName="Set up"
      />
      <SetUp
        border="border-b"
        py="py-6"
        name="Security Keys"
        value="Not keys added"
        actionName="Set up"
      />
      <SetUp
        py="py-6"
        name="Telephone Number"
        value="+502 9414 929"
        actionName="Edit"
      />
    </Card>
  );
};

export default TwoFactor;
