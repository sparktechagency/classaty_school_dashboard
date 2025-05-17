import React from "react";

// Define the types for the props
interface ProfileTapProps {
  activeTab: "editProfile" | "changePassword"; // activeTab can be either "editProfile" or "changePassword"
  setActiveTab: (tab: "editProfile" | "changePassword") => void; // setActiveTab function updates activeTab
}

const ProfileTap: React.FC<ProfileTapProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: "editProfile" | "changePassword") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex mt-5">
      {/* Edit Profile Tab */}
      <button
        onClick={() => handleTabClick("editProfile")}
        className={`text-lg font-medium py-2 cursor-pointer ${
          activeTab === "editProfile"
            ? "bg-gradient-to-b from-[#22355855] to-[#22355810] text-secondary-color border-t-2 border-secondary-color"
            : "text-[#4B5563] border-t-2 border-[#D1D5DB]"
        }`}
      >
        <span className="px-4">Edit Profile</span>
      </button>

      {/* Change Password Tab */}
      <button
        onClick={() => handleTabClick("changePassword")}
        className={`text-lg font-medium py-2 cursor-pointer ${
          activeTab === "changePassword"
            ? "bg-gradient-to-b from-[#22355855] to-[#22355810] text-secondary-color border-t-2 border-secondary-color"
            : "text-[#4B5563] border-t-2 border-[#D1D5DB]"
        }`}
      >
        <span className="px-4">Change Password</span>
      </button>
    </div>
  );
};

export default ProfileTap;
