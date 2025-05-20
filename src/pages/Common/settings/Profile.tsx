import EditProfile from "../../../Components/Dashboard/Profile/EditProfile";

const Profile = () => {
  return (
    <div
      className=" min-h-[90vh] p-10  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <EditProfile />
    </div>
  );
};
export default Profile;
