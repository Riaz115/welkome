import React, { useState } from "react";
import Card from "components/card";
import { useAuthStore } from "stores/useAuthStore";
import { MdEdit, MdSave, MdCancel, MdPhone, MdEmail, MdLanguage, MdLocationOn, MdBusiness } from "react-icons/md";
import { toast } from "react-toastify";

const ContactInfo = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: user?.phone || '',
    businessEmail: user?.businessEmail || '',
    website: user?.website || '',
    businessAddress: user?.businessAddress || {},
    contactPerson: user?.contactPerson || {}
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
      toast.success('Contact information updated successfully!');
    } catch (error) {
      toast.error('Failed to update contact information');
    }
  };

  const handleCancel = () => {
    setEditData({
      phone: user?.phone || '',
      businessEmail: user?.businessEmail || '',
      website: user?.website || '',
      businessAddress: user?.businessAddress || {},
      contactPerson: user?.contactPerson || {}
    });
    setIsEditing(false);
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

  if (user?.role !== 'seller') {
    return null;
  }

  return (
    <Card extra={"w-full h-full p-6"}>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-2">
            Contact Information
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Your business contact details and address information
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

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <MdPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-navy-700 dark:text-white mb-1">Phone Number</h5>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-600 dark:text-white"
                  placeholder="Phone Number"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{user?.phone || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <MdEmail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-navy-700 dark:text-white mb-1">Business Email</h5>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.businessEmail}
                  onChange={(e) => setEditData({...editData, businessEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-600 dark:text-white"
                  placeholder="Business Email"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{user?.businessEmail || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <MdLanguage className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-navy-700 dark:text-white mb-1">Website</h5>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => setEditData({...editData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-600 dark:text-white"
                  placeholder="Website URL"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.website ? (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700">
                      {user.website}
                    </a>
                  ) : 'Not provided'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <MdBusiness className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-navy-700 dark:text-white mb-1">Contact Person</h5>
              <p className="text-gray-600 dark:text-gray-300">{getContactPerson()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <MdLocationOn className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h5 className="font-semibold text-navy-700 dark:text-white mb-1">Business Address</h5>
            <p className="text-gray-600 dark:text-gray-300">{getBusinessAddress()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactInfo;
