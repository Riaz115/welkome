import React, { useState } from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useAuthStore } from "stores/useAuthStore";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const Banner = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    gender: user?.gender || '',
    businessName: user?.businessName || '',
    businessType: user?.businessType || '',
    businessEmail: user?.businessEmail || '',
    businessDescription: user?.businessDescription || '',
    website: user?.website || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...editData };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      useAuthStore.getState().user = updatedUser;
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || user?.firstName + ' ' + user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      gender: user?.gender || '',
      businessName: user?.businessName || '',
      businessType: user?.businessType || '',
      businessEmail: user?.businessEmail || '',
      businessDescription: user?.businessDescription || '',
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  const displayName = user?.name || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'User');
  const displayRole = user?.role === 'admin' ? 'Administrator' : user?.role === 'seller' ? 'Seller' : 'User';

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      <div className="w-full flex justify-end mb-2">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <MdSave className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <MdCancel className="w-4 h-4" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
          >
            <MdEdit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        {isEditing ? (
          <div className="w-full space-y-3">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Email"
            />
            {user?.role === 'seller' && (
              <>
                <input
                  type="text"
                  value={editData.businessName}
                  onChange={(e) => setEditData({...editData, businessName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Business Name"
                />
                <input
                  type="text"
                  value={editData.businessType}
                  onChange={(e) => setEditData({...editData, businessType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Business Type"
                />
              </>
            )}
          </div>
        ) : (
          <>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {displayName}
            </h4>
            <h5 className="text-base font-normal text-gray-600">{displayRole}</h5>
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
            {user?.role === 'seller' && (
              <div className="mt-2 space-y-1">
                {user?.businessName && (
                  <p className="text-sm text-gray-500">Business: {user.businessName}</p>
                )}
                {user?.phone && (
                  <p className="text-sm text-gray-500">Phone: {user.phone}</p>
                )}
                {user?.businessEmail && (
                  <p className="text-sm text-gray-500">Business Email: {user.businessEmail}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            {user?.role === 'admin' ? 'Admin' : 'Seller'}
          </h4>
          <p className="text-sm font-normal text-gray-600">Role</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            {user?.verificationStatus || user?.sellerVerificationStatus || 'N/A'}
          </h4>
          <p className="text-sm font-normal text-gray-600">Status</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            {user?.isBlocked ? 'Blocked' : 'Active'}
          </h4>
          <p className="text-sm font-normal text-gray-600">Account</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
