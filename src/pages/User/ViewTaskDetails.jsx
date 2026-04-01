import React, { useEffect, useState } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useParams } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";

// Components
import DashboardLayout from "../../components/layout/DashboardLayout";
import AvatarGroup from "../../components/AvatarGroup";

// Utils
import { API_ENDPOINT } from "../../utils/api";
import axiosInst from "../../utils/axios";

const ViewTaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20";
      case "Completed":
        return "text-violet-400 bg-violet-500/10 border border-violet-500/20";
      case "Pending":
        return "text-rose-400 bg-rose-500/10 border border-rose-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border border-slate-500/20";
    }
  };

  const getTaskById = async () => {
    try {
      const response = await axiosInst.get(
        API_ENDPOINT.TASKS.GET_TASK_BY_ID(id),
      );

      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Task fetching error: ", error);
    }
  };

  const updateTodoCheckList = async (index) => {
    const todoCheckList = [...task?.task?.todoCheckList];
    const taskId = id;

    if (todoCheckList && todoCheckList[index]) {
      todoCheckList[index].completed = !todoCheckList[index].completed;

      try {
        const response = await axiosInst.put(
          API_ENDPOINT.TASKS.UPDATE_TASK_TODO(taskId),
          { todoCheckList },
        );

        if (response.status === 200) {
          setTask({ ...task, task: response.data.task });
        } else {
          todoCheckList[index].completed = !todoCheckList[index].completed;
        }
      } catch (error) {
        todoCheckList[index].completed = !todoCheckList[index].completed;
      }
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskById();
    }
    return () => {};
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 max-w-5xl mx-auto"
      >
        {task && (
          <div className="grid grid-cols-1 mt-4">
            <div className="form-card w-full">
              <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-5">
                <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-indigo-400">
                  {task?.task?.title}
                </h2>

                <div
                  className={`text-[11px] md:text-[13px] font-semibold ${getStatusTagColor(task?.task?.status)} px-4 py-1.5 rounded-full`}
                >
                  {task?.task?.status}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <InfoBox
                    label="Description"
                    value={task?.task?.description}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <div>
                    <InfoBox label="Priority" value={task?.task?.priority} />
                  </div>
                  <div>
                    <InfoBox
                      label="Due Date"
                      value={
                        task?.task?.dueDate
                          ? moment(task?.task?.dueDate).format("Do MMM YYYY")
                          : "N/A"
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Assigned To
                    </label>
                    <AvatarGroup
                      avatars={task?.task?.assignedTo || []}
                      maxVisible={5}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
                      Todo Checklist
                    </label>

                    <div className="space-y-2">
                      {task?.task?.todoCheckList?.map((item, index) => (
                        <TodoCheckList
                          key={`todo_${index}`}
                          text={item.text}
                          isChecked={item?.completed}
                          onChange={() => updateTodoCheckList(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {task?.task?.attachments?.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
                        Attachments
                      </label>

                      <div className="space-y-2">
                        {task?.task?.attachments?.map((link, index) => (
                          <Attachment
                            key={`link_${index}`}
                            link={link}
                            index={index}
                            onClick={() => handleLinkClick(link)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default ViewTaskDetailsPage;

const InfoBox = ({ label, value }) => {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
        {label}
      </label>

      <p className="text-sm font-medium text-slate-200 mt-0.5 leading-relaxed">
        {value}
      </p>
    </div>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div
      className="flex items-center gap-3 p-3 bg-slate-800/40 border border-white/5 rounded-lg hover:border-white/10 transition-colors cursor-pointer"
      onClick={onChange}
    >
      <input
        type="checkbox"
        checked={isChecked}
        readOnly
        className="w-4 h-4 text-violet-500 bg-slate-800 border-white/20 rounded focus:ring-violet-500 focus:ring-2 cursor-pointer transition-all accent-violet-500"
      />
      <p
        className={`text-[13px] ${isChecked ? "text-slate-500 line-through" : "text-slate-200"} transition-all`}
      >
        {text}
      </p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-slate-800/40 px-3 py-3 text-left hover:bg-slate-800/60 hover:border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 group"
    >
      <div className="flex min-w-0 items-center gap-3 w-content pr-4">
        <span className="text-xs font-bold text-violet-400/80 shrink-0">
          {displayIndex}
        </span>

        <p className="text-[13px] font-medium text-slate-200 truncate">
          {link}
        </p>
      </div>

      <LuSquareArrowOutUpRight
        className="text-slate-400 shrink-0 group-hover:text-violet-400 transition-colors"
        aria-hidden="true"
      />
    </button>
  );
};
