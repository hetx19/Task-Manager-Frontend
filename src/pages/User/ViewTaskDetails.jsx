import React, { useEffect, useState } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useParams } from "react-router-dom";
import moment from "moment";

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
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
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
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-medium">
                  {task?.task?.title}
                </h2>

                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(task?.task?.status)} px-4 py-0.5 rounded`}
                >
                  {task?.task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.task?.dueDate
                        ? moment(task?.task?.dueDate).format("Do MM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assigned To
                  </label>
                  <AvatarGroup
                    avatars={
                      task?.task?.assignedTo?.map(
                        (item) => item?.profileImageUrl,
                      ) || []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>

                {task?.task?.todoCheckList?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoCheckList(index)}
                  />
                ))}
              </div>

              {task?.task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task?.task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetailsPage;

const InfoBox = ({ label, value }) => {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500">{label}</label>

      <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">
        {value}
      </p>
    </div>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer"
      />
      <p className="text-[13px] text-gray-800">{text}</p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2 mt-2 mb-3 text-left hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-xs font-semibold text-gray-400 shrink-0">
          {displayIndex}
        </span>

        <p className="text-xs text-black truncate">{link}</p>
      </div>

      <LuSquareArrowOutUpRight
        className="text-gray-400 shrink-0"
        aria-hidden="true"
      />
    </button>
  );
};
