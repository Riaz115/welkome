import React, { useState } from "react";
import Card from "components/card";
import { useAuthStore } from "stores/useAuthStore";
import { MdEdit, MdSave, MdCancel, MdLanguage } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoTwitter, IoLogoFacebook } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";

const SocialMedia = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    socialMedia: user?.socialMedia || {}
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
      toast.success('Social media information updated successfully!');
    } catch (error) {
      toast.error('Failed to update social media information');
    }
  };

  const handleCancel = () => {
    setEditData({
      socialMedia: user?.socialMedia || {}
    });
    setIsEditing(false);
  };

  const handleSocialMediaChange = (platform, value) => {
    setEditData({
      ...editData,
      socialMedia: {
        ...editData.socialMedia,
        [platform]: value
      }
    });
  };

  const socialPlatforms = [
    { key: 'facebook', label: 'Facebook', icon: IoLogoFacebook, color: 'text-blue-600' },
    { key: 'instagram', label: 'Instagram', icon: IoLogoInstagram, color: 'text-pink-600' },
    { key: 'twitter', label: 'Twitter', icon: IoLogoTwitter, color: 'text-blue-400' },
    { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-700' }
  ];

  if (user?.role !== 'seller') {
    return null;
  }

  return (
    <Card extra={"w-full h-full p-6"}>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-2">
            Social Media
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Your social media profiles and online presence
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          const currentValue = user?.socialMedia?.[platform.key] || '';
          const editValue = editData.socialMedia?.[platform.key] || '';

          return (
            <div key={platform.key} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              <div className="p-2 bg-white dark:bg-navy-600 rounded-lg">
                <IconComponent className={`w-5 h-5 ${platform.color}`} />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-navy-700 dark:text-white mb-1">{platform.label}</h5>
                {isEditing ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => handleSocialMediaChange(platform.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-600 dark:text-white"
                    placeholder={`${platform.label} profile URL`}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentValue ? (
                      <a 
                        href={currentValue} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-600 hover:text-brand-700 break-all"
                      >
                        {currentValue}
                      </a>
                    ) : 'Not provided'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {Object.values(user?.socialMedia || {}).every(value => !value) && !isEditing && (
        <div className="text-center py-8">
          <MdLanguage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No social media profiles added yet</p>
        </div>
      )}
    </Card>
  );
};

export default SocialMedia;
