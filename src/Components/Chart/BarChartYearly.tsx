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

interface ChartData {
  name: string;
  uv: number;
}

const data: ChartData[] = [
  { name: "2020", uv: 2500 },
  { name: "2022", uv: 3000 },
  { name: "2023", uv: 4500 },
  { name: "2024", uv: 4700 },
  { name: "2025", uv: 2700 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; uv: number }[];
}

const Bar_Chart_Yearly: React.FC = () => {
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-gray-600">
            Total: <span className="font-semibold">{payload[0].uv}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const tickStyle = { fill: "#0A0A0A", fontSize: 12 };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap={50}
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" tick={tickStyle} tickMargin={8} />
          <YAxis
            tick={tickStyle}
            tickFormatter={(value) => `${value / 1000}k`}
            tickMargin={12}
            domain={[0, 5000]}
          />
          {/* Grid lines */}
          {[1000, 2000, 3000, 4000, 5000].map((y) => (
            <ReferenceLine key={y} y={y} stroke="#E5E5EF" />
          ))}
          <Bar
            dataKey="uv"
            fill="#28314E"
            barSize={28}
            radius={[10, 10, 10, 10]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart_Yearly;
