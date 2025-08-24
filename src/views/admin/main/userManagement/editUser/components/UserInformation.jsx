import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";

const UserInformation = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    email: userData.email || '',
    phoneNumber: userData.phoneNumber || '',
    gender: userData.gender || '',
    dateOfBirth: userData.dateOfBirth || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <Card extra={"w-full mt-3 px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Basic Information
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Here you can change user basic information
        </p>
      </div>
      
      {/* inputs */}
      <div className="mt-[37px] grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputField
          extra="mb-3"
          label="Full Name"
          placeholder="Enter full name"
          id="fullname"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
        />
        <InputField
          extra="mb-3"
          label="Email Address"
          placeholder="user@example.com"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <InputField
          extra="mb-3"
          label="Phone Number"
          placeholder="+256 71234567"
          id="phone"
          type="text"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        />
        <div className="mb-3">
          <label className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm outline-none dark:!border-white/10 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      {/* full width inputs */}
      <InputField
        extra="mb-3"
        label="Date of Birth"
        placeholder="YYYY-MM-DD"
        id="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
      />

      <div className="flex w-full justify-end">
        <button 
          onClick={handleSave}
          className="rounded-xl bg-brand-500 px-8 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Save Changes
        </button>
      </div>
    </Card>
  );
};

export default UserInformation; 