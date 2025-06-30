import { Link } from "react-router-dom";
import { AllIcons } from "../../../../../public/images/AllImages";
import useUserData from "../../../../hooks/useUserData";

const activities = [
  {
    id: "1",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "2",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "3",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "4",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "5",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "6",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "2:00 PM",
  },
  {
    id: "7",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "3:00 PM",
  },
  {
    id: "8",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "3:30 PM",
  },
  {
    id: "9",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "4:00 PM",
  },
  {
    id: "10",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "4:15 PM",
  },
  {
    id: "11",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "5:00 PM",
  },
  {
    id: "12",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "5:30 PM",
  },
  {
    id: "13",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "6:00 PM",
  },
  {
    id: "14",
    activity: "At 2:00 PM, a student added 6 new subjects.",
    time: "6:15 PM",
  },
  {
    id: "15",
    activity: "At 2:00 PM, a student added 6 new subjects.",

    time: "6:30 PM",
  },
];

const RecentNotification = () => {
  const user = useUserData();
  return (
    <div className="w-full max-h-[300px] xl:max-h-[500px] overflow-y-auto  rounded-xl relative border-2 border-[#e1e1e1]">
      <div className="flex justify-between items-center bg-primary-color border-b-2 border-secondary-color sticky top-0 p-5 z-10">
        <h1 className="text-xl lg:text-2xl text-base-color font-semibold">
          Recent Activity
        </h1>
        <Link to={`/${user?.role}/notifications`}>
          <p className="cursor-pointer text-[#898c8d] underline ">View all</p>
        </Link>
      </div>

      <div className="flex flex-col  p-5">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center gap-2 border-b border-[#e1e1e1] py-3"
          >
            <div className=" p-1.5 bg-secondary-color rounded-full w-fit">
              <img src={AllIcons.bell} alt="bell" className="w-5 h-5 " />
            </div>
            <div>
              <p className="text-base-color text-base font-semibold">
                {activity.activity}
              </p>

              <p className="text-sm text-[#8A8D8E] mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
