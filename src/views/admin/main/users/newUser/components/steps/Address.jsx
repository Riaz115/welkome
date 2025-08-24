import InputField from "components/fields/InputField";

const Address = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Address
      </h4>

      {/* content */}
      <div className="mt-4">
        <InputField
          extra="mb-3"
          label="Address Line 1"
          placeholder="eg. Main Street 203"
          id="address1"
          type="text"
        />
        <InputField
          extra="mb-3"
          label="Address Line 2"
          placeholder="eg. Apartment, Floor"
          id="address1"
          type="text"
        />

        {/* inputs */}
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="City"
            placeholder="eg. Miami"
            id="address1"
            type="text"
          />

          <div className="col-span-1 grid grid-cols-2 gap-3">
            <InputField
              label="State"
              placeholder="Florida"
              id="address1"
              type="text"
            />
            <InputField
              label="Zip"
              placeholder="eg. Apartment Floor"
              id="address1"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
