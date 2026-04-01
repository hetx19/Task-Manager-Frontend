import React from "react";

const Progress = ({ progress, status }) => {
  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]";
      case "Completed":
        return "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden box-border border border-white/5">
      <div
        className={`${getColor()} h-1.5 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${progress || 0}%` }}
      ></div>
    </div>
  );
};

export default Progress;
