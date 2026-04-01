import React from "react";
import { getIntials } from "../../utils/helper";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-4 transition-all hover:scale-[1.01] hover:shadow-violet-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-md group-hover:bg-violet-400/40 transition-colors" />
            {userInfo?.profileImageUrl ? (
              <img
                src={userInfo?.profileImageUrl}
                alt={`Avatar`}
                className="relative w-14 h-14 rounded-full border-2 border-violet-500/50 shadow-md object-cover"
              />
            ) : (
              <div className="relative w-14 h-14 rounded-full border-2 border-violet-500/50 shadow-md flex items-center justify-center bg-slate-800 text-violet-400 font-bold text-lg">
                {getIntials(userInfo?.name || "")}
              </div>
            )}
          </div>

          <div>
            <p className="text-base font-bold text-slate-100">
              {userInfo?.name}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              {userInfo?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-6">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "Completed":
        return "text-violet-400 bg-violet-500/10 border-violet-500/30";
      default:
        return "text-rose-400 bg-rose-500/10 border border-rose-500/20";
    }
  };

  return (
    <div
      className={`flex-1 min-w-0 flex flex-col items-center justify-center py-2 px-1 rounded-xl border backdrop-blur-sm transition-colors hover:bg-slate-800/80 ${getStatusTagColor()}`}
    >
      <span className="text-lg font-bold drop-shadow-sm leading-none">
        {count}
      </span>
      <span className="text-[9px] uppercase font-bold tracking-widest mt-1.5 opacity-80 text-center truncate w-full">
        {label}
      </span>
    </div>
  );
};
