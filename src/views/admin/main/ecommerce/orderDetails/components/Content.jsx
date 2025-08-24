import React, { useState } from 'react';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call or integration
  };

  return (
    <div className="pb-[57px] w-full bg-white dark:!bg-navy-800">
      <div className="px-4 md:px-[34px] mt-6 lg:mt-10">
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white mb-4">
          Add New Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white dark:!bg-navy-700 rounded-2xl shadow-md p-6"
        >
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 dark:text-white mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Electronics"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 px-4 py-2 text-navy-700 dark:text-white bg-white dark:bg-navy-800 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 dark:text-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add some details about the category..."
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 px-4 py-2 text-navy-700 dark:text-white bg-white dark:bg-navy-800 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 dark:text-white mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-navy-700 dark:text-white bg-white dark:bg-navy-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-gray-300 dark:file:border-white/10 file:text-sm file:font-semibold file:bg-gray-100 dark:file:bg-navy-600 file:text-navy-700 dark:file:text-white hover:file:bg-gray-200 dark:hover:file:bg-navy-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full md:w-fit bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2 rounded-xl transition duration-300"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
