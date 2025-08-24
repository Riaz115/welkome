import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const UserSocial = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    emailVerified: userData.emailVerified || false,
    googleLinked: userData.googleLinked || false,
    googleEmail: userData.googleEmail || '',
    appleLinked: userData.appleLinked || false,
    appleEmail: userData.appleEmail || '',
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
    <Card extra={"w-full px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Email & Social Accounts
        </h4>
        <p className="mt-1 text-base text-gray-600">
          Manage user email verification and social account connections
        </p>
      </div>

      {/* Email Verification */}
      <div className="mt-[37px] mb-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            {formData.emailVerified ? (
              <MdCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <MdCancel className="h-6 w-6 text-red-500" />
            )}
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Email Verification
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {formData.emailVerified ? 'Email is verified' : 'Email not verified'}
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.emailVerified}
              onChange={(e) => handleInputChange('emailVerified', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Google Account */}
      <div className="mb-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            {formData.googleLinked ? (
              <MdCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <MdCancel className="h-6 w-6 text-red-500" />
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Google Account
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {formData.googleLinked ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.googleLinked}
              onChange={(e) => handleInputChange('googleLinked', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {formData.googleLinked && (
          <div className="mt-2">
            <InputField
              label="Google Email"
              placeholder="user@gmail.com"
              id="googleEmail"
              type="email"
              value={formData.googleEmail}
              onChange={(e) => handleInputChange('googleEmail', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Apple Account */}
      <div className="mb-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            {formData.appleLinked ? (
              <MdCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <MdCancel className="h-6 w-6 text-red-500" />
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Apple Account
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {formData.appleLinked ? 'Connected' : 'Not connected'}
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.appleLinked}
              onChange={(e) => handleInputChange('appleLinked', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {formData.appleLinked && (
          <div className="mt-2">
            <InputField
              label="Apple Email"
              placeholder="user@icloud.com"
              id="appleEmail"
              type="email"
              value={formData.appleEmail}
              onChange={(e) => handleInputChange('appleEmail', e.target.value)}
            />
          </div>
        )}
      </div>

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

export default UserSocial; 