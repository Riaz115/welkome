import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

const Product = () => {
  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h4 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Product Info
      </h4>

      {/* content */}
      {/* inputs */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="col-span-2 md:col-span-1">
          <InputField
            extra="mb-4"
            label="Product Name"
            placeholder="eg. Elegant Chair"
            id="productname"
            type="text"
          />
          <InputField
            extra="mb-4"
            label="Weight"
            placeholder="eg. 20 Kg"
            id="weight"
            type="text"
          />
          <InputField
            extra="mb-4"
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
            placeholder="eg. Classic"
            id="collection"
            type="text"
          />

          {/* text area */}
          <TextField
            label="Description"
            placeholder="Short description about the product!"
            id="textarea"
            cols="30"
            rows="7"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
