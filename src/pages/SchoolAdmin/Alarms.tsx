import { AllIcons } from "../../../public/images/AllImages";

const alarms = [
  {
    id: 1,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 6,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 7,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 8,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 9,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 10,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 11,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 12,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 13,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 14,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 15,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 16,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 17,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 18,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 19,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
  {
    id: 20,
    message: "At 2:00 PM, a student added 6 new subjects",
    time: "Fri, 12:30pm",
  },
];

const AlarmsPage = () => {
  return (
    <div className=" bg-primary-color w-full h-full  rounded-xl">
      <div className="flex items-center bg-primary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <h1 className="text-3xl font-bold text-secondary-color">Alarms</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {alarms.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-secondary-color p-1.5 rounded-full">
              <img src={AllIcons.bell} className="w-6 h-6" alt="" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-base-color">
                {notification.message}
              </span>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlarmsPage;
