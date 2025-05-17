import { useState } from "react";
import ProfileTap from "../../../Components/Dashboard/Profile/ProfileTap";
import EditProfile from "../../../Components/Dashboard/Profile/EditProfile";
import ChangePassword from "../../../Components/Dashboard/Profile/ChangePassword";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"editProfile" | "changePassword">(
    "editProfile"
  );

  return (
    <div
      className=" min-h-[90vh] p-10  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <ProfileTap activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "editProfile" ? <EditProfile /> : <ChangePassword />}
    </div>
  );
};
export default Profile;
