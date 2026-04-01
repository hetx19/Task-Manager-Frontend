import React from "react";

const CustomToopTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md shadow-2xl rounded-lg p-3 border border-white/10 text-white">
        <p className="text-xs uppercase tracking-wider font-semibold mb-1 text-slate-400">
          {payload[0].name}
        </p>
        <p className="text-[13px] text-slate-300">
          Tasks:{" "}
          <span className="text-[13px] font-bold text-white">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToopTip;
