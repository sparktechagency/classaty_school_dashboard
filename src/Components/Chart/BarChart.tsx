/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

const Bar_Chart = ({ data }: any) => {
  // Custom tooltip to display the information
  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-gray-600">
            Total Income:{" "}
            <span className="font-semibold">${payload[0].amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#0A0A0A" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          <ReferenceLine y={10} stroke="#E5E5EF" />
          <ReferenceLine y={20} stroke="#E5E5EF" />
          <ReferenceLine y={30} stroke="#E5E5EF" />
          <ReferenceLine y={40} stroke="#E5E5EF" />
          <ReferenceLine y={50} stroke="#E5E5EF" />
          <ReferenceLine y={60} stroke="#E5E5EF" />
          <Bar
            dataKey="amount"
            fill="url(#incomeGradient)" // Bar color
            barSize={20} // Width of each bar
            radius={[10, 10, 10, 10]} // Rounded corners for bars
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#28314E" />
              <stop offset="100%" stopColor="#28314E" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
