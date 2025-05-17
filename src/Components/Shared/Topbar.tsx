import { BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllIcons, AllImages } from "../../../public/images/AllImages";

// Define the type for a notification
interface Notification {
  id: number;
  message: string;
  time: string;
}

// Define the types for the component props
interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "At 2:00 PM, a student added 6 new subjects.",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "At 2:00 PM, a student added 6 new subjects.",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "At 2:00 PM, a student added 6 new subjects.",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "At 2:00 PM, a student added 6 new subjects.",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "At 2:00 PM, a student added 6 new subjects.",
    time: "Fri, 12:30pm",
  },
];

const Topbar: React.FC<TopbarProps> = ({ collapsed, setCollapsed }) => {
  // Type the user object from localStorage
  const user = JSON.parse(localStorage.getItem("user_info") || "null");

  console.log("user", user);

  const handleMenuClick = () => {
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notifications.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-secondary-color rounded-full w-fit h-fit">
              <img src={AllIcons.bell} className="w-5 h-5" alt="" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-base-color font-semibold">
                {notification.message}
              </p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 font-semibold py-1"
      >
        See More
      </Link>
    </div>
  );

  return (
    <div className="flex justify-between gap-0 items-center mt-1.5 bg-secondary-color px-4 py-2 rounded-full">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl !text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <img src={AllIcons.bell} className="w-8 h-8" alt="" />
        </Dropdown>

        <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1 ">
          <img
            src={AllImages.profile}
            alt="profile_pic"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
            className="rounded-full border border-secondary-color"
          />
          <div className="flex flex-col justify-center">
            <p className="text-base-color font-semibold text-sm">
              David Wilson
            </p>
            <p className="text-base-color text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
