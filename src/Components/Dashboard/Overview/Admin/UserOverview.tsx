import { useState } from "react";
import YearOption from "../../../../utils/YearOption";
import { useGetUserChartQuery } from "../../../../redux/features/adminOverview/adminOverviewApi";
import UserChart from "../../../Chart/UserChart";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data: chartData } = useGetUserChartQuery({ year });

  console.log(year);
  return (
    <div
      className="w-full p-3 bg-primary-color rounded-lg "
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between text-base-color my-5">
        <p className="text-2xl text-secondary-color lg:text-3xl font-bold">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <UserChart chartData={chartData?.data} />
      </div>
    </div>
  );
};

export default UserOverview;
