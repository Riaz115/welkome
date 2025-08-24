import SetUp from "components/actions/SetUp";
import Card from "components/card";

const Connect = () => {
  return (
    <Card extra={"w-full px-[30px] py-[30px]"}>
      {/* Header */}
      <div className="flex items-center justify-between font-dm">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Connected
        </h4>
      </div>
      {/* content */}
      <SetUp
        name="Google Account"
        value="Enabled"
        actionName="Edit"
        py=" py-[20px]"
        border="border-b"
      />
      <SetUp
        py=" py-[20px]"
        border="border-b"
        name="Twitter Account"
        value="Not Configured"
        actionName="Set up"
      />
      <SetUp
        border="border-b"
        py=" py-[20px]"
        name="Instagram Account"
        value="Not Configured"
        actionName="Set up"
      />
      <SetUp
        py="py-[20px]"
        name="Facebook Account"
        value="Configured"
        actionName="Add"
      />
    </Card>
  );
};

export default Connect;
