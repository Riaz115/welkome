import Card from "components/card";
import SwitchField from "components/fields/SwitchField";

const NewsLetter = () => {
  return (
    <Card extra={"w-full px-[30px] py-[30px] pb-10"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Newsletter
        </h4>
      </div>
      {/* content */}
      <div>
        <SwitchField
          id="weekly"
          label="Weekly Newletter"
          desc="Get notified about articles, discounts and new products."
          mt="mt-[45px]"
          mb="mb-[25px]"
          textWidth="w-[430px]"
        />
        <SwitchField
          id="lifecycle"
          label="Lifecycle emails"
          desc="Get personalized offers and emails based on your activity."
          mt="mt-[35px]"
          mb="mb-1"
          textWidth="w-[420px]"
        />
        <SwitchField
          id="promotion"
          label="Promotional emails"
          desc="Get personalized offers and emails based on your orders & preferences."
          mt="mt-[35px]"
          mb="mb-1"
          textWidth="w-[410px]"
        />
        <SwitchField
          id="product"
          label="Product updates"
          desc="Checking this will allow us to notify you when we make updates to products you have downloaded/purchased."
          mt="mt-[35px]"
          mb="mb-1"
          textWidth="w-[300px]"
        />
      </div>
    </Card>
  );
};

export default NewsLetter;
