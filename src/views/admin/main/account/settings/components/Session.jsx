import Card from "components/card";
import SessionBadge from "components/dataDisplay/SessionBadge";
const Session = () => {
  return (
    <Card extra={"w-full py-4 px-8"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Session
        </h4>
      </div>
      {/* content */}
      <div>
        <SessionBadge
          name="Chrome, Bucharest 68.128.072.301"
          detail="EU"
          status="enabled"
          py=" py-[27px]"
          border="border-b"
          bgTextColor=" bg-green-100 dark:bg-green-50 text-green-500"
        />

        <SessionBadge
          name="Chrome MacOS (Your current session)"
          detail="EU"
          status="enabled"
          py=" py-[20px]"
          border="border-b"
          bgTextColor=" bg-green-100 dark:bg-green-50 text-green-500"
        />

        <SessionBadge
          name="Firefox on Desktop, Barcelona"
          detail="EU"
          status="enabled"
          py=" py-[20px]"
          border="border-b"
          bgTextColor=" bg-green-100 dark:bg-green-50 text-green-500"
        />

        <SessionBadge
          name="Safari on Iphone"
          detail="EU"
          status="disabled"
          py=" py-[20px]"
          bgTextColor=" bg-red-100 dark:bg-red-50 text-red-500"
        />
      </div>
    </Card>
  );
};

export default Session;
