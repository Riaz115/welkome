import ActionButtons from "components/actions/ActionButtons";
import Card from "components/card";

const Invoice = () => {
  return (
    <Card extra={"px-9 w-full h-full pt-[28px] pb-4"}>
      {/* Header */}
      <div className="mb-8 mt-3 flex items-center justify-between">
        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
          Invoices
        </h5>
        <h5 className="font-bold text-brand-500 hover:cursor-pointer dark:text-white">
          See all invoices
        </h5>
      </div>

      <ActionButtons
        mb="mb-[42px]"
        name="SIM76-#024214"
        date="January, 14 2022"
        sum="$997"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
      <ActionButtons
        mb="mb-[42px]"
        name="SIM23-#024213"
        date="January, 03 2022"
        sum="$233"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
      <ActionButtons
        mb="mb-[42px]"
        name="SIM42-#024212"
        date="December, 29 2021"
        sum="$342"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
      <ActionButtons
        mb="mb-[42px]"
        name="SIM93-#024211"
        date="November, 30 2021"
        sum="$798"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
      <ActionButtons
        mb="mb-[42px]"
        name="SIM13-#024210"
        date="September, 07 2021"
        sum="$844"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
      <ActionButtons
        name="SIM76-#024214"
        date="January, 14 2022"
        sum="$997"
        action={console.log("succesful action")}
        actionName="View PDF"
      />
    </Card>
  );
};

export default Invoice;
