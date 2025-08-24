import React from "react";
import Card from "components/card";
import { MdCheckCircle, MdCancel, MdAccessTime, MdPerson } from "react-icons/md";

const UserStatus = ({ userData, onUpdate }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "suspended":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "deleted":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card extra={"w-full mt-3 px-6 py-6"}>
      {/* Header */}
      <div className="w-full px-[8px]">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Account Status & Activity
        </h4>
        <p className="mt-1 text-base text-gray-600">
          User account status and activity information
        </p>
      </div>

      {/* Status Cards */}
      <div className="mt-[37px] space-y-4">
        {/* Account Status */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            <MdPerson className="h-6 w-6 text-brand-500" />
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Account Status
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Current account standing
              </p>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(userData.status)}`}>
            {userData.status}
          </span>
        </div>

        {/* Registration Date */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            <MdAccessTime className="h-6 w-6 text-brand-500" />
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Registration Date
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Member since
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            {formatDate(userData.registrationDate)}
          </span>
        </div>

        {/* Email Verification Status */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            {userData.emailVerified ? (
              <MdCheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <MdCancel className="h-6 w-6 text-red-500" />
            )}
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                Email Verification
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Primary email status
              </p>
            </div>
          </div>
          <span className={`text-sm font-medium ${userData.emailVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {userData.emailVerified ? 'Verified' : 'Not Verified'}
          </span>
        </div>

        {/* Social Accounts Summary */}
        <div className="rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="mb-3">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              Connected Social Accounts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Linked social media accounts
            </p>
          </div>
          
          <div className="space-y-2">
            {/* Google Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {userData.googleLinked ? (
                  <MdCheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <MdCancel className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-navy-700 dark:text-white">Google</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {userData.googleLinked ? userData.googleEmail || 'Connected' : 'Not connected'}
              </span>
            </div>
            
            {/* Apple Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {userData.appleLinked ? (
                  <MdCheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <MdCancel className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-navy-700 dark:text-white">Apple</span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {userData.appleLinked ? userData.appleEmail || 'Connected' : 'Not connected'}
              </span>
            </div>
          </div>
        </div>

        {/* User ID */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/0 p-4 dark:!border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-100 text-brand-600 dark:bg-brand-900/30">
              <span className="text-xs font-bold">#</span>
            </div>
            <div>
              <p className="text-sm font-bold text-navy-700 dark:text-white">
                User ID
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Unique identifier
              </p>
            </div>
          </div>
          <span className="text-sm font-mono font-medium text-navy-700 dark:text-white">
            {userData.id}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default UserStatus; 