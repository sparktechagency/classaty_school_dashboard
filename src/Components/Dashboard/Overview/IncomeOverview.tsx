import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";
import { useGetEarningChartQuery } from "../../../redux/features/adminOverview/adminOverviewApi";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data } = useGetEarningChartQuery({ year });

  console.log(year);
  return (
    <div
      className="w-full  p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-end text-base-color my-4">
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <hr />
      {/* <div>{value === "monthly" ? <Bar_Chart /> : <Bar_Chart_Yearly />}</div> */}
      <div>
        <Bar_Chart data={data?.data} />
      </div>
    </div>
  );
};

export default IncomeOverview;
