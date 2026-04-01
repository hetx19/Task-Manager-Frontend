import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-violet-500/10 text-violet-400 border border-violet-500/20";
      case "In Progress":
        return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
      case "Pending":
        return "text-rose-400 bg-rose-500/10 border border-rose-500/20";
      default:
        return "bg-slate-800 text-slate-500 border border-white/10";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Low":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      default:
        return "bg-slate-800 text-slate-500 border border-white/10";
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="py-3 px-4 text-slate-300 font-semibold text-[13px] tracking-wider uppercase">
              Name
            </th>
            <th className="py-3 px-4 text-slate-300 font-semibold text-[13px] tracking-wider uppercase">
              Status
            </th>
            <th className="py-3 px-4 text-slate-300 font-semibold text-[13px] tracking-wider uppercase">
              Priority
            </th>
            <th className="py-3 px-4 text-slate-300 font-semibold text-[13px] tracking-wider uppercase hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr
              key={task._id}
              className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-4 px-4 text-slate-200 font-medium text-[13px] max-w-[200px] truncate">
                {task.title}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 font-semibold text-xs rounded-full inline-block ${getStatusBadgeColor(task.status)}`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 font-semibold text-xs rounded-full inline-block ${getPriorityBadgeColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-4 px-4 text-slate-400 text-[13px] whitespace-nowrap hidden md:table-cell">
                {task.createdAt
                  ? moment(task.createdAt).format("Do MMM YYYY")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
