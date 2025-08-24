import Card from "components/card";
import InputField from "components/fields/InputField";
import TagsField from "components/fields/TagsField";

const Details = () => {
  return (
    <Card extra={"!z-1 w-full h-fit py-[20px] px-[20px]"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Pricing Details
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can change your product pricing details
        </p>
      </div>
      {/* inputs */}
      <div className="mt-10 grid h-full w-full grid-cols-1 gap-3 md:grid-cols-2">
        {/* left side */}
        <div className="grid h-fit grid-cols-2 gap-3">
          <InputField
            label="Price"
            placeholder="eg. $99"
            id="price"
            type="text"
          />
          <InputField
            label="Unique Code"
            placeholder="eg. 4030120241"
            id="price"
            type="text"
          />
          <div className="col-span-2">
            <div>
              <label
                htmlFor="currency"
                className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white"
              >
                Currency
              </label>
              <div className="w-full rounded-xl border border-gray-200 p-3 text-sm font-normal text-gray-600 outline-none dark:!border-white/10 sm:w-full md:w-full">
                <select
                  className="text-lightFourth w-full rounded-xl pr-4 text-sm outline-none dark:bg-navy-800 dark:text-white"
                  name=""
                  id="currency"
                >
                  <option value="usd">USD</option>
                  <option value="usd">EUR</option>
                  <option value="usd">GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="col-span-1  row-span-2  h-full">
          <TagsField
            id="description"
            label="Description"
            mb="0px"
            h="150px"
            placeholderTags={[
              {
                name: "chair",
                id: 1,
              },
              {
                name: "furniture",
                id: 2,
              },
              {
                name: "elegant",
                id: 3,
              },
            ]}
          />
        </div>
      </div>
    </Card>
  );
};

export default Details;
