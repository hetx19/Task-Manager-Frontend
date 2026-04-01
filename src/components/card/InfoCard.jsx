import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-xl border border-white/5 backdrop-blur-sm shadow-md">
      <div className={`w-3 h-3 md:w-4 md:h-4 ${color} rounded-full shadow-sm`} />
      <p className="text-xs md:text-[14px] text-slate-400">
        <span className="text-sm md:text-[15px] text-white font-semibold">
          {value}
        </span>{" "}
        {label}
      </p>
    </div>
  );
};

export default InfoCard;
