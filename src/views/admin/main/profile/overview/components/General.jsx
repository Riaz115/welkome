import Card from "components/card";
import React, { useState } from "react";
import { useAuthStore } from "stores/useAuthStore";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const General = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: user?.phone || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    gender: user?.gender || '',
    businessRegistrationNumber: user?.businessRegistrationNumber || '',
    businessEmail: user?.businessEmail || '',
    businessDescription: user?.businessDescription || '',
    website: user?.website || '',
    businessAddress: user?.businessAddress || {},
    contactPerson: user?.contactPerson || {},
    bankDetails: user?.bankDetails || {},
    socialMedia: user?.socialMedia || {},
    paymentMethods: user?.paymentMethods || [],
    deliveryOptions: user?.deliveryOptions || []
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
      phone: user?.phone || '',
      dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      gender: user?.gender || '',
      businessRegistrationNumber: user?.businessRegistrationNumber || '',
      businessEmail: user?.businessEmail || '',
      businessDescription: user?.businessDescription || '',
      website: user?.website || '',
      businessAddress: user?.businessAddress || {},
      contactPerson: user?.contactPerson || {},
      bankDetails: user?.bankDetails || {},
      socialMedia: user?.socialMedia || {},
      paymentMethods: user?.paymentMethods || [],
      deliveryOptions: user?.deliveryOptions || []
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const getBusinessAddress = () => {
    if (!user?.businessAddress) return 'Not provided';
    const addr = user.businessAddress;
    return `${addr.district || ''}, ${addr.subCounty || ''}, ${addr.village || ''}, ${addr.street || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '');
  };

  const getContactPerson = () => {
    if (!user?.contactPerson) return 'Not provided';
    const contact = user.contactPerson;
    return `${contact.name || ''} - ${contact.phone || ''} - ${contact.email || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '');
  };

  const getBankDetails = () => {
    if (!user?.bankDetails) return 'Not provided';
    const bank = user.bankDetails;
    return `${bank.bankName || ''} - ${bank.accountName || ''} - ${bank.accountNumber || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '');
  };

  const getSocialMedia = () => {
    if (!user?.socialMedia) return 'Not provided';
    const social = user.socialMedia;
    return `${social.facebook || ''} ${social.instagram || ''} ${social.twitter || ''} ${social.linkedin || ''}`.trim();
  };

  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="mt-2 mb-8 w-full flex justify-between items-center">
        <div>
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            {user?.role === 'admin' ? 'Admin Information' : 'Business Information'}
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600">
            {user?.role === 'admin' 
              ? 'Your administrative account details and personal information.'
              : 'Your business details, contact information, and operational data.'
            }
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
          >
            <MdEdit className="w-4 h-4" />
            Edit
          </button>
        ) : (
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
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
        <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Phone</p>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Phone Number"
            />
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {user?.phone || 'Not provided'}
            </p>
          )}
        </div>

        <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date of Birth</p>
          {isEditing ? (
            <input
              type="date"
              value={editData.dob}
              onChange={(e) => setEditData({...editData, dob: e.target.value})}
              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {formatDate(user?.dob)}
            </p>
          )}
        </div>

        <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Gender</p>
          {isEditing ? (
            <select
              value={editData.gender}
              onChange={(e) => setEditData({...editData, gender: e.target.value})}
              className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {user?.gender || 'Not provided'}
            </p>
          )}
        </div>

        {user?.role === 'seller' && (
          <>
            <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Business Registration</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.businessRegistrationNumber}
                  onChange={(e) => setEditData({...editData, businessRegistrationNumber: e.target.value})}
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="Registration Number"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {user?.businessRegistrationNumber || 'Not provided'}
                </p>
              )}
            </div>

            <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Business Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.businessEmail}
                  onChange={(e) => setEditData({...editData, businessEmail: e.target.value})}
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="Business Email"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {user?.businessEmail || 'Not provided'}
                </p>
              )}
            </div>

            <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Website</p>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => setEditData({...editData, website: e.target.value})}
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
                  placeholder="Website URL"
                />
              ) : (
                <p className="text-base font-medium text-navy-700 dark:text-white">
                  {user?.website || 'Not provided'}
                </p>
              )}
            </div>

            <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Business Address</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {getBusinessAddress()}
              </p>
            </div>

            <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {getContactPerson()}
              </p>
            </div>

            <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Bank Details</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {getBankDetails()}
              </p>
            </div>

            <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Social Media</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {getSocialMedia()}
              </p>
            </div>

            <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Payment Methods</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.paymentMethods?.join(', ') || 'Not provided'}
              </p>
            </div>

            <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Delivery Options</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {user?.deliveryOptions?.join(', ') || 'Not provided'}
              </p>
            </div>
          </>
        )}

        <div className="shadow-[30px] flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Account Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {user?.isBlocked ? 'Blocked' : 'Active'}
          </p>
        </div>

        <div className="shadow-[30px] flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Verification Status</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {user?.verificationStatus || user?.sellerVerificationStatus || 'N/A'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
