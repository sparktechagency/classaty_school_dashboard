import { Link } from "react-router-dom";
import { AllIcons } from "../../../../../public/images/AllImages";
import useUserData from "../../../../hooks/useUserData";
import { useGetNotificationQuery } from "../../../../redux/features/school/schoolApi";
import dayjs from "dayjs";

export interface INotification {
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isRead: boolean;
  linkId: string;
  message: string;
  receiverId: string;
  role: "teacher" | "student" | "admin" | "parents" | "school" | "supperAdmin"; // extend based on actual roles
  senderId: string;
  type: "assignment" | "announcement" | "message" | string;
  __v: number;
}

const RecentNotification = () => {
  const user = useUserData();

  const { data: activities } = useGetNotificationQuery({});

  return (
    <div className="w-full max-h-[300px] xl:max-h-[660px] overflow-y-auto  rounded-xl relative border-2 border-[#e1e1e1]">
      <div className="flex justify-between items-center bg-primary-color border-b-2 border-secondary-color sticky top-0 p-5 z-10">
        <h1 className="text-xl lg:text-2xl text-base-color font-semibold">
          Recent Activity
        </h1>
        <Link to={`/${user?.role}/alarms`}>
          <p className="cursor-pointer text-[#898c8d] underline ">View all</p>
        </Link>
      </div>

      <div className="flex flex-col  p-5">
        {activities?.data?.result?.map((activity: INotification, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 border-b border-[#e1e1e1] py-3"
          >
            <div className=" p-1.5 bg-secondary-color rounded-full w-fit">
              <img src={AllIcons.bell} alt="bell" className="w-5 h-5 " />
            </div>
            <div>
              <p className="text-base-color text-base font-semibold">
                At {dayjs(activity.createdAt).format("hh:mm A")} {", "}
                {activity.message}
              </p>

              <p className="text-sm text-[#8A8D8E] mt-1">
                {dayjs(activity.createdAt).format("DD-MM-YYYY hh:mm A")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
