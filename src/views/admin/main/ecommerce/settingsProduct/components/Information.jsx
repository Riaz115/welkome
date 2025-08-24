import Card from "components/card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

const Information = () => {
  return (
    <Card extra={"w-full px-[20px] py-[22px] h-fit"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Product Information
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can change your product information
        </p>
      </div>
      {/* inputs */}
      <div className="mt-9 grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <InputField
            extra="mb-3"
            label="Product Name"
            placeholder="eg. Elegant Chair"
            id="name"
            type="text"
          />
          <InputField
            extra="mb-3"
            label="Weight"
            placeholder="eg. 20kg"
            id="weight"
            type="text"
          />
          <InputField
            label="Color"
            placeholder="eg. purple"
            id="color"
            type="text"
          />
        </div>
        {/* right side */}
        <div className="col-span-2 md:col-span-1">
          <InputField
            extra="mb-3"
            label="Collection"
            placeholder="eg. Classics"
            id="collection"
            type="text"
          />
          {/* text area */}
          <TextField
            label="Description"
            placeholder="Short description about the product"
            id="textarea"
            cols="30"
            rows="6"
          />
        </div>
      </div>
    </Card>
  );
};

export default Information;
