import InputField from "components/fields/InputField";
import TagsField from "components/fields/TagsField";

const Pricing = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h1 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Pricing
      </h1>
      {/* inputs */}
      <div className="mt-10 grid h-full w-full grid-cols-1 gap-3 md:grid-cols-2">
        {/* left side */}
        <div className="flex h-fit flex-col gap-3 md:col-span-2 md:grid md:grid-cols-2">
          <InputField
            label="Price"
            placeholder="eg. $99"
            id="price"
            type="text"
          />

          <div className="w-full md:col-span-1">
            <div>
              <label
                htmlFor="currency"
                className="ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white"
              >
                Currency
              </label>
              <div className="w-full rounded-xl border border-gray-200 py-3 px-2.5 text-sm text-gray-600 outline-none dark:!border-white/10 dark:!bg-navy-800">
                <select id="currency" className="w-full dark:!bg-navy-800">
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <TagsField />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
