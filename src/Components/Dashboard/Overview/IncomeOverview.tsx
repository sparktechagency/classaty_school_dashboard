import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";
import ReuseSelect from "../../../ui/Form/ReuseSelect";
import Bar_Chart_Yearly from "../../Chart/BarChartYearly";

const IncomeOverview = () => {
  const [value, setValue] = useState("monthly");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  console.log(year);
  return (
    <div
      className="w-full  p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between text-base-color mt-4">
        <ReuseSelect
          defaultValue={value}
          value={"Monthly Earning"}
          onChange={(e) => setValue(e)}
          name="month"
          rules={[]}
          selectClassName="!w-[180px]"
          placeholder="Select Month"
          disabled={false}
          options={[
            { value: "monthly", label: "Monthly Earning" },
            { value: "yearly", label: "Yearly Earning" },
          ]}
        />
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <hr />
      <div>{value === "monthly" ? <Bar_Chart /> : <Bar_Chart_Yearly />}</div>
    </div>
  );
};

export default IncomeOverview;
