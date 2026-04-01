import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Components
import CustomToopTip from "./CustomToopTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="45%"
          outerRadius={95}
          innerRadius={65}
          labelLine={false}
          stroke="#0f172a"
          strokeWidth={4}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors?.[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomToopTip />} />
        <Legend content={<CustomLegend />} verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
