import React from "react";
import moment from "moment";
import { LuPaperclip } from "react-icons/lu";
import { motion } from "framer-motion";

// Components
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoCheckList,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Pending":
        return "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20";
      case "In Progress":
        return "text-lime-400 bg-lime-500/10 border border-lime-500/20";
      case "Completed":
        return "text-violet-400 bg-violet-500/10 border border-violet-500/20";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border border-amber-500/20";
      case "High":
        return "text-rose-400 bg-rose-500/10 border border-rose-500/20";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card cursor-pointer py-5 flex flex-col justify-between h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-violet-500/30"
    >
      <div>
        <div className="flex items-end gap-3 px-2 mb-4">
          <div className={`text-[11px] font-semibold ${getStatusTagColor()} px-3 py-1 rounded-full shadow-sm`}>
            {status}
          </div>
          <div className={`text-[11px] font-semibold ${getPriorityTagColor()} px-3 py-1 rounded-full shadow-sm`}>
            {priority}
          </div>
        </div>

        <div className={`px-3 border-l-[3px] ${status === "In Progress" ? "border-cyan-500" : status === "Completed" ? "border-violet-500" : "border-slate-500"} transition-colors`}>
          <p className="text-base font-bold text-slate-100 mt-2 line-clamp-2 leading-snug">
            {title}
          </p>
          <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
          <p className="text-[13px] text-slate-300 font-medium mt-3 mb-2 flex items-center gap-2">
            Tasks Done:
            <span className="font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-md">
              {completedTodoCount} / {todoCheckList?.length || 0}
            </span>
          </p>

          <Progress progress={progress || (todoCheckList?.length > 0 ? (completedTodoCount / todoCheckList.length) * 100 : 0)} status={status} />
        </div>
      </div>

      <div className="px-3 mt-4 pt-4 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Start Date</label>
            <p className="text-[13px] font-semibold text-slate-300 mt-0.5">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Due Date</label>
            <p className="text-[13px] font-semibold text-slate-300 mt-0.5">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AvatarGroup avatars={assignedTo || []} />
          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <LuPaperclip className="text-violet-400" />
              <span className="text-xs font-bold text-violet-100">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
