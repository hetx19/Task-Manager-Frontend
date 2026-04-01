import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

// Components
import BarCustomToolTip from "./BarCustomToolTip";

const CustomBarGraph = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#10b981"; // emerald-500
      case "Medium":
        return "#f59e0b"; // amber-500
      case "High":
        return "#f43f5e"; // rose-500
      default:
        return "#10b981";
    }
  };

  return (
    <div className="mt-6 w-[100%]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 500 }}
            stroke="none"
            dy={10}
          />
          <YAxis tick={{ fontSize: 13, fill: "#94a3b8", fontWeight: 500 }} stroke="none" dx={-10} />

          <Tooltip
            content={<BarCustomToolTip />}
            cursor={{ fill: "transparent" }}
          />

          <Bar
            dataKey="count"
            nameKey="priority"
            radius={[6, 6, 0, 0]}
            barSize={40}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarGraph;
