import React from 'react';
import banner from 'assets/img/profile/banner.png';
import Card from 'components/card';

const UserBanner = ({ userData, onUpdate }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'deleted':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ status: newStatus });
  };

  return (
    <Card extra={'items-center pt-[16px] pb-10 px-[16px] bg-cover'}>
      {/* background and profile */}
      <div
        className="jsu relative mt-1 flex h-28 w-full justify-center rounded-[20px] bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full bg-blue-300">
          <img
            className="h-full w-full rounded-full object-cover"
            src={
              userData.profileImage?.[1] ||
              'https://i.ibb.co/7p0d1Cd/Frame-24.png'
            }
            alt={userData.fullName}
          />
        </div>
      </div>

      {/* name and position */}
      <div className="mt-14 flex flex-col items-center">
        <h4 className="mt-1 text-xl font-bold text-navy-700 dark:text-white">
          {userData.fullName}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          User ID: {userData.id}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Member since: {formatDate(userData.registrationDate)}
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <h6 className="text-sm font-normal text-gray-600 dark:text-gray-300">
            Account Status:
          </h6>
          <select
            className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-navy-700 dark:!border-white/10 dark:!bg-navy-800 dark:text-white"
            value={userData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default UserBanner;
