import InputField from "components/fields/InputField";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Pricing = ({ data, onDataChange }) => {
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field, value) => {
    onDataChange({ [field]: value });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onDataChange({ 
        tags: [...(data.tags || []), newTag.trim()] 
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onDataChange({ 
      tags: (data.tags || []).filter(tag => tag !== tagToRemove) 
    });
  };

  return (
    <div className="h-full w-full rounded-[20px] px-3 pt-7 md:px-8">
      {/* Header */}
      <h1 className="pt-[5px] text-xl font-bold text-navy-700 dark:text-white">
        Pricing
      </h1>
      
      {/* inputs */}
      <div className="mt-10 grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2">
        {/* Pricing Section */}
        <div className="flex h-fit flex-col gap-3 md:col-span-2 md:grid md:grid-cols-2">
          <InputField
            label="Price *"
            placeholder="eg. 99"
            id="price"
            type="number"
            value={data.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
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
                <select 
                  id="currency" 
                  className="w-full dark:!bg-navy-800"
                  value={data.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tags Section */}
        <div className="col-span-2">
          <h6 className="mb-3 text-sm font-bold text-navy-700 dark:text-white">
            Product Tags
          </h6>
          <div className="flex flex-wrap gap-2 mb-3">
            {(data.tags || []).map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-brand-500 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
                >
                  <MdClose className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag..."
              className="flex-1 rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white dark:!bg-navy-800"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              <MdAdd className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 