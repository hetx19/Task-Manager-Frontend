import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import SelectUsers from "../../components/input/SelectUsers";
import SelectDropdown from "../../components/input/SelectDropdown";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TodoCheckListInput from "../../components/input/TodoCheckListInput";
import AddAttachmentsInput from "../../components/input/AddAttachmentsInput";

// Utils
import axiosInst from "../../utils/axios";
import { API_ENDPOINT } from "../../utils/api";
import { PRIORITY_DATA } from "../../utils/data";

// Context API's
import { UserContext } from "../../context/userContext";

const CreateTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};
  const { user } = useContext(UserContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    attachments: [],
    todoCheckList: [],
  });

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      attachments: [],
      todoCheckList: [],
    });
  };

  const createTask = async () => {
    setLoading(true);

    try {
      const todoList = taskData.todoCheckList?.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInst.post(
        API_ENDPOINT.TASKS.CREATE_NEW_TASK,
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todoList,
        },
      );

      toast.success("Task created successfully");

      clearData();
    } catch (error) {
      console.error("Create task error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);

    try {
      const todoList = taskData.todoCheckList?.map((item) => {
        const prevTodoCheckList = currentTask?.todoCheckList || [];
        const matchedTask = prevTodoCheckList.find(
          (prevItem) => prevItem.text === item,
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInst.put(
        API_ENDPOINT.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todoList,
        },
      );

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Task updation error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due Date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any user.");
      return;
    }
    if (taskData.todoCheckList?.length === 0) {
      setError("Add atleast one todo task.");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  const getTaskById = async () => {
    try {
      const response = await axiosInst.get(
        API_ENDPOINT.TASKS.GET_TASK_BY_ID(taskId),
      );

      if (response.data && response.data.task) {
        const taskInfo = response.data.task;
        setCurrentTask(taskInfo);

        setTaskData((pervState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item._id) || [],
          todoCheckList:
            taskInfo?.todoCheckList?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.error("Task fetching error", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInst.delete(API_ENDPOINT.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Task deletion error",
        error?.response?.data?.message || error.message,
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId);
    }

    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mt-5 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 mt-4">
          <div className="form-card w-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-indigo-400">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-400 bg-rose-500/10 rounded-lg px-3 py-1.5 border border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/20 transition-colors"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Task Title
                </label>
                <input
                  placeholder="e.g. Redesign Dashboard UI"
                  className="form-input"
                  value={taskData.title}
                  onChange={({ target }) =>
                    handleValueChange("title", target.value)
                  }
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                  Description
                </label>
                <textarea
                  placeholder="Describe the main objectives..."
                  className="form-input resize-none"
                  rows={4}
                  value={taskData.description}
                  onChange={({ target }) =>
                    handleValueChange("description", target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5">
                <div className="md:col-span-4 flex flex-col justify-end">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                    Priority
                  </label>
                  <SelectDropdown
                    options={PRIORITY_DATA}
                    value={taskData.priority}
                    onChange={(value) => handleValueChange("priority", value)}
                    placeholder="Select Priority"
                  />
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                    Due Date
                  </label>
                  <input
                    className="form-input !mt-0 h-[46px] [color-scheme:dark]"
                    value={taskData.dueDate || ""}
                    onChange={({ target }) =>
                      handleValueChange("dueDate", target.value)
                    }
                    type="date"
                  />
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                    Assign To
                  </label>
                  <SelectUsers
                    selectedUsers={taskData.assignedTo}
                    setSelectedUsers={(value) => {
                      handleValueChange("assignedTo", value);
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block border-t border-white/5 pt-4">
                    Todo Checklist
                  </label>
                  <TodoCheckListInput
                    todoList={taskData?.todoCheckList}
                    setTodoList={(value) => {
                      handleValueChange("todoCheckList", value);
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block border-t border-white/5 pt-4">
                    Add Attachments
                  </label>
                  <AddAttachmentsInput
                    attachments={taskData?.attachments}
                    setAttachments={(value) => {
                      handleValueChange("attachments", value);
                    }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-rose-400 mt-5 bg-rose-500/10 p-2 rounded-md border border-rose-500/20">{error}</p>
            )}

            <div className="flex justify-end mt-8 border-t border-white/5 pt-5">
              <button
                className="btn-primary w-auto px-8"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTaskPage;
