const data = [
  {
    id: 1,
    background: "#FFFFFF",
    name: "Total User",
    // icon: <ImUsers className="size-7 text-secondary-color" />,
    count: 10000,
  },
  {
    id: 2,
    background: "#FFFFFF",
    name: "Regular Users",
    // icon: <ImUser className="size-7 text-secondary-color" />,
    count: 4000,
  },
  {
    id: 3,
    background: "#FFFFFF",
    name: "Business Users",
    // icon: <FaUserTie className="size-7 text-secondary-color" />,
    count: 6000,
  },
  {
    id: 4,
    background: "#FFFFFF",
    name: "Total Event",
    // icon: <MdEvent className="size-7 text-secondary-color" />,
    count: 6000,
  },
  {
    id: 5,
    background: "#FFFFFF",
    name: "Active  Job Listings",
    // // icon: <img src={AllIcons.job} className="size-7" />,
    count: 6000,
  },
  {
    id: 6,
    background: "#FFFFFF",
    name: "Revenue",
    // icon: <RiMoneyDollarCircleFill className="size-7 text-secondary-color" />,
    count: 6000,
  },
];

const OverviewCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 mb-5">
      {/* Company  */}
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1`}
          style={{
            backgroundColor: item.background,
            boxShadow: "0px 3px 5px 2px #00000040",
          }}
        >
          <div className="flex items-center p-6 justify-between w-full gap-2 ">
            <div className=" w-fit ">
              <p className="text-base  font-semibold text-base-color mb-1  tracking-tight">
                {item.name}
              </p>
              <p className="text-lg  font-bold text-base-color capitalize tracking-wider">
                {item.count}
              </p>
            </div>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCard;
