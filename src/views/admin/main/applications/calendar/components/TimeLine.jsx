import Card from "components/card";
import TimelineItem from "components/dataDisplay/TimelineItem";
const TimeLine = () => {
  return (
    <Card extra={"w-full p-5"}>
      {/* Header */}
      <div>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Timeline
        </h4>
        <p className="text-base font-medium text-gray-600">
          See your products in our timelines:
        </p>
      </div>

      {/* Timeline items */}
      <div className="mt-[30px]">
        <TimelineItem
          title="Meeting with a client"
          day="03"
          weekday="Wed"
          hours="10:30 - 12:00"
          current="current"
          mb="mb-[16px]"
        />
        <TimelineItem
          mb="mb-[16px]"
          title="Webinar - Marketing for Developers"
          day="12"
          weekday="Fri"
          hours="10:30 - 12:00"
        />
        <TimelineItem
          mb="mb-[16px]"
          title="Design UI and check sales on PayPal"
          day="16"
          weekday="Tue"
          hours="09:00 - 14:00"
        />
        <TimelineItem
          title="Configure table for Daily tasks on Notion"
          day="27"
          weekday="Sat"
          hours="20:00 - 22:30"
        />
      </div>
    </Card>
  );
};

export default TimeLine;
