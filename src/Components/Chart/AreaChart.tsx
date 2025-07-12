import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the structure of the chart data
interface ChartData {
  month: string;
  totalPresent: number;
}

const activeDotStyle = {
  r: 8, // Size of the hover dot
  stroke: "#FFFFFF", // Color of the hover dot
  strokeWidth: 2, // Border width of the hover dot
  fill: "#28314E", // Inside color of the hover dot
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Area_Chart: React.FC<ChartData[] | any> = ({ chartData }) => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value: number): string => `${value}`;

  // Custom tick style
  const tickStyle = { fill: "#40140f" };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#434E58"
            strokeDasharray="0"
          />
          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#ffffff00", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#28314E" stopOpacity={1} />
              <stop offset="70%" stopColor="#F2F6FC" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff", // Tooltip background color
              border: "1px solid #ccc", // Tooltip border
              borderRadius: "5px", // Tooltip border radius
            }}
            itemStyle={{ color: "#0a0a08" }} // Tooltip text color
            labelStyle={{ color: "#202020" }} // Tooltip label color
            formatter={(value: number): [string, string] => [
              `${value}`,
              "Total Present",
            ]}
            labelFormatter={(label: string) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="totalPresent"
            stroke="#28314E"
            strokeWidth={3}
            fill="url(#colorUv)"
            activeDot={{ ...activeDotStyle }} // Custom hover line
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
