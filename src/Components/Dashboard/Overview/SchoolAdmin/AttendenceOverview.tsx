import { useState } from "react";
import { useGetAttendanceChartDataQuery } from "../../../../redux/features/school/schoolApi";
import YearOption from "../../../../utils/YearOption";
import Area_Chart from "../../../Chart/AreaChart";

const AttendenceOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data: chartData } = useGetAttendanceChartDataQuery({ year });

  return (
    <div
      className="w-full p-3 bg-primary-color rounded-lg "
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between text-base-color my-5">
        <p className="text-2xl text-secondary-color lg:text-3xl font-bold">
          Attendence Overview
        </p>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <Area_Chart chartData={chartData?.data} />
      </div>
    </div>
  );
};

export default AttendenceOverview;
