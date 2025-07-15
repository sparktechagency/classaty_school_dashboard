import { BarsOutlined } from "@ant-design/icons";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import SpinLoader from "../../ui/Spiner";

// Define the types for the component props
interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ collapsed, setCollapsed }) => {
  const serverUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  const profileData = data?.data;
  return (
    <div className="flex justify-between gap-0 items-center mt-1.5 bg-secondary-color px-4 py-2 rounded-full">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl !text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        {isFetching ? (
          <SpinLoader />
        ) : (
          <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1 ">
            <img
              src={serverUrl + "/" + profileData?.image}
              alt="profile_pic"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
              className="rounded-full border border-secondary-color"
            />
            <div className="flex flex-col justify-center">
              <p className="text-base-color font-semibold text-sm">
                {profileData?.name}
              </p>
              <p className="text-base-color text-xs">
                {profileData?.role === "supperAdmin"
                  ? "Super Admin"
                  : "School Admin"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
