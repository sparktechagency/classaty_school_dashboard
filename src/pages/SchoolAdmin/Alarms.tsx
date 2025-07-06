import dayjs from "dayjs";
import { AllIcons } from "../../../public/images/AllImages";
import { INotification } from "../../Components/Dashboard/Overview/Admin/RecentNotification";
import { useGetNotificationQuery } from "../../redux/features/school/schoolApi";


const AlarmsPage = () => {
  const { data: activities } = useGetNotificationQuery({});

  return (
    <div className=" bg-primary-color w-full h-full  rounded-xl">
      <div className="flex items-center bg-primary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <h1 className="text-3xl font-bold text-secondary-color">Alarms</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
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
export default AlarmsPage;
