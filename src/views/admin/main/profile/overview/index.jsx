import React, { useEffect } from "react";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import Documents from "./components/Documents";
import ContactInfo from "./components/ContactInfo";
import SocialMedia from "./components/SocialMedia";
import { useAuthStore } from "stores/useAuthStore";

const ProfileOverview = () => {
  const { user, fetchProfile, loading } = useAuthStore();
  const isSeller = user?.role === 'seller';

  useEffect(() => {
    if (user?.id || user?._id) {
      const userId = user.id || user._id;
      fetchProfile(userId);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-5 lg:gap-5">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>
      </div>

      {isSeller && (
        <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
            <ContactInfo />
          </div>
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
            <SocialMedia />
          </div>
          <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
            <Documents />
          </div>
        </div>
      )}

      <div className="mb-4 grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
