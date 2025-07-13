import { AllIcons } from "../../../../../public/images/AllImages";
import { useGetCountsQuery } from "../../../../redux/features/adminOverview/adminOverviewApi";
import SpinLoader from "../../../../ui/Spiner";

const AdminOverviewCard = () => {
  const { data, isFetching } = useGetCountsQuery({});

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total School",
      icon: (
        <div className="p-3 rounded-full bg-[#F2F6FC]">
          <img src={AllIcons.school} className="w-6 h-6" alt="icon" />
        </div>
      ),
      count: isFetching ? <SpinLoader /> : data?.data?.totalSchool,
    },
    {
      id: 2,
      background: "#FFFFFF",
      name: "Total Student",
      icon: (
        <div className="p-3 rounded-full bg-[#F2F6FC]">
          <img src={AllIcons.student} className="w-6 h-6" alt="icon" />
        </div>
      ),
      count: isFetching ? <SpinLoader /> : data?.data?.totalStudent,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Teachers",
      icon: (
        <div className="p-3 rounded-full bg-[#F2F6FC]">
          <img src={AllIcons.teachers} className="w-6 h-6" alt="icon" />
        </div>
      ),
      count: isFetching ? <SpinLoader /> : data?.data?.totalTeacher,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Parents",
      icon: (
        <div className="p-3 rounded-full bg-[#F2F6FC]">
          <img src={AllIcons.parants} className="w-6 h-6" alt="icon" />
        </div>
      ),
      count: isFetching ? <SpinLoader /> : data?.data?.totalParents,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Earnings",
      icon: (
        <div className="p-3 rounded-full bg-[#F2F6FC]">
          <img src={AllIcons.earning} className="w-6 h-6" alt="icon" />
        </div>
      ),
      count: isFetching ? <SpinLoader /> : `${data?.data?.totalEarning}`,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 mb-5">
      {/* Company  */}
      {cards.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1 border-2 border-[#e1e1e1]`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="flex items-center p-6 justify-between w-full gap-2 ">
            <div className=" w-fit ">
              <p className="text-sm sm:text-base lg:text-lg  font-semibold text-base-color mb-1  tracking-tight">
                {item.name}
              </p>
              <p className="text-lg sm:text-xl lg:text-3xl  font-bold text-secondary-color capitalize tracking-wider">
                {item.name === "Earnings" ? `${item.count} KWD` : item.count}
              </p>
            </div>
            <div className="">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOverviewCard;
