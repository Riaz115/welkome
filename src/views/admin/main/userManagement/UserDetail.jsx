import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserApiStore } from "stores/useUserApiStore";
import Card from "components/card";
import { MdArrowBack, MdBlock, MdCheckCircle, MdVerified, MdWarning } from "react-icons/md";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, blockUser, unblockUser, loading } = useUserApiStore();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiData, setIsApiData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching user data for ID:', id);
        const user = await getUserById(id);
        console.log('Received user data:', user);
        if (user) {
          setUserData(user);
          setIsApiData(true);
        } else {
          console.warn('User not found or API error, showing fallback data');
          setIsApiData(false);
          setUserData({
            _id: id,
            id: id,
            name: 'User Details',
            email: 'user@example.com',
            firstName: 'User',
            lastName: 'Name',
            phone: 'N/A',
            gender: 'N/A',
            isBlocked: false,
            emailVerified: false,
            kycVerified: false,
            profileCompleted: false,
            isSeller: false,
            isRider: false,
            source: 'manual',
            role: 'user',
            sellerVerificationStatus: 'not_applied',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.warn('API Error, showing fallback data:', error);
        setIsApiData(false);
        setUserData({
          _id: id,
          id: id,
          name: 'User Details (API Unavailable)',
          email: 'user@example.com',
          firstName: 'User',
          lastName: 'Name',
          phone: 'N/A',
          gender: 'N/A',
          isBlocked: false,
          emailVerified: false,
          kycVerified: false,
          profileCompleted: false,
          isSeller: false,
          isRider: false,
          source: 'manual',
          role: 'user',
          sellerVerificationStatus: 'not_applied',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, getUserById, navigate]);

  const handleBlockUser = async () => {
    try {
      await blockUser(userData._id || userData.id);
      setUserData(prev => ({ ...prev, isBlocked: true }));
    } catch (error) {
      console.error('Failed to block user:', error);
    }
  };

  const handleUnblockUser = async () => {
    try {
      await unblockUser(userData._id || userData.id);
      setUserData(prev => ({ ...prev, isBlocked: false }));
    } catch (error) {
      console.error('Failed to unblock user:', error);
    }
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return 'Not provided';
    
    let date;
    if (typeof dateInput === 'object' && dateInput.$date) {
      date = new Date(dateInput.$date);
    } else if (typeof dateInput === 'string' || dateInput instanceof Date) {
      date = new Date(dateInput);
    } else {
      return 'Invalid date';
    }
    
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatObjectId = (objectIdInput) => {
    if (!objectIdInput) return 'Not provided';
    
    if (typeof objectIdInput === 'object' && objectIdInput.$oid) {
      return objectIdInput.$oid;
    } else if (typeof objectIdInput === 'string') {
      return objectIdInput;
    }
    
    return 'Invalid ID';
  };

  const getStatusBadge = (status, isBlocked) => {
    if (isBlocked) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/20 dark:text-red-300">
          <MdBlock className="mr-1 h-4 w-4" />
          Blocked
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <MdCheckCircle className="mr-1 h-4 w-4" />
        Active
      </span>
    );
  };

  const getVerificationBadge = (verified) => {
    return verified ? (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <MdVerified className="mr-1 h-3 w-3" />
        Verified
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
        <MdWarning className="mr-1 h-3 w-3" />
        Not Verified
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          Loading user data...
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-xl font-medium text-navy-700 dark:text-white">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-5">
      {!isApiData && (
        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <MdWarning className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                API is currently unavailable. Showing sample user data structure. Real data will appear when the backend is connected.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/main/userManagement/users')}
            className="flex items-center space-x-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700"
          >
            <MdArrowBack className="h-4 w-4" />
            <span>Back to Users</span>
          </button>
          <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
            User Details
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {userData.isBlocked ? (
            <button
              onClick={handleUnblockUser}
              disabled={loading}
              className="flex items-center space-x-2 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50"
            >
              <MdCheckCircle className="h-4 w-4" />
              <span>Unblock User</span>
            </button>
          ) : (
            <button
              onClick={handleBlockUser}
              disabled={loading}
              className="flex items-center space-x-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
            >
              <MdBlock className="h-4 w-4" />
              <span>Block User</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card extra="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-blue-600">
                      {(userData.name || userData.firstName || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                    {userData.name || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'No Name'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
                  <div className="mt-2">
                    {getStatusBadge(userData.status, userData.isBlocked)}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-navy-700 dark:text-white">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID</label>
                    <p className="text-navy-700 dark:text-white font-mono text-sm">
                      {formatObjectId(userData._id) || formatObjectId(userData.id) || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">First Name</label>
                    <p className="text-navy-700 dark:text-white">{userData.firstName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Name</label>
                    <p className="text-navy-700 dark:text-white">{userData.lastName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                    <p className="text-navy-700 dark:text-white">{userData.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-navy-700 dark:text-white">{userData.email}</p>
                      {getVerificationBadge(userData.emailVerified)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                    <p className="text-navy-700 dark:text-white">
                      {userData.dialCode && userData.phone ? `${userData.dialCode} ${userData.phone}` : userData.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-navy-700 dark:text-white">Personal Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Gender</label>
                    <p className="text-navy-700 dark:text-white capitalize">{userData.gender || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth</label>
                    <p className="text-navy-700 dark:text-white">{formatDate(userData.dob)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Registration Source</label>
                    <p className="text-navy-700 dark:text-white capitalize">{userData.source || 'manual'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</label>
                    <p className="text-navy-700 dark:text-white capitalize">{userData.role || 'user'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Firebase UID</label>
                    <p className="text-navy-700 dark:text-white">{userData.uid || 'Not provided'}</p>
                  </div>
                  {userData.verificationToken && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Verification Token</label>
                      <p className="text-navy-700 dark:text-white font-mono text-xs break-all">
                        {userData.verificationToken}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card extra="p-6">
            <h3 className="mb-4 text-lg font-semibold text-navy-700 dark:text-white">Account Status & Verification</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Verified</label>
                  {getVerificationBadge(userData.emailVerified)}
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">KYC Verified</label>
                  {getVerificationBadge(userData.kycVerified)}
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Completed</label>
                  {getVerificationBadge(userData.profileCompleted)}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Is Seller</label>
                  {getVerificationBadge(userData.isSeller)}
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Is Rider</label>
                  {getVerificationBadge(userData.isRider)}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Seller Verification Status</label>
                  <p className="text-navy-700 dark:text-white capitalize">
                    {userData.sellerVerificationStatus?.replace('_', ' ') || 'Not Applied'}
                  </p>
                  {userData.sellerRejectionReason && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Reason: {userData.sellerRejectionReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card extra="p-6">
            <h3 className="mb-4 text-lg font-semibold text-navy-700 dark:text-white">Account Timeline</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Created At</label>
                <p className="text-navy-700 dark:text-white">{formatDate(userData.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</label>
                <p className="text-navy-700 dark:text-white">{formatDate(userData.updatedAt)}</p>
              </div>
              {userData.isBlocked && userData.blockedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked At</label>
                  <p className="text-navy-700 dark:text-white">{formatDate(userData.blockedAt)}</p>
                  {userData.blockReason && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Reason: {userData.blockReason}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>

          {userData.isBlocked && (
            <Card extra="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="mb-4 text-lg font-semibold text-red-700 dark:text-red-300">Block Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-red-600 dark:text-red-400">Blocked At</label>
                  <p className="text-red-700 dark:text-red-300">{formatDate(userData.blockedAt)}</p>
                </div>
                {userData.blockReason && (
                  <div>
                    <label className="text-sm font-medium text-red-600 dark:text-red-400">Block Reason</label>
                    <p className="text-red-700 dark:text-red-300">{userData.blockReason}</p>
                  </div>
                )}
                {userData.blockedBy && (
                  <div>
                    <label className="text-sm font-medium text-red-600 dark:text-red-400">Blocked By (Admin ID)</label>
                    <p className="text-red-700 dark:text-red-300 font-mono text-sm">
                      {formatObjectId(userData.blockedBy)}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
