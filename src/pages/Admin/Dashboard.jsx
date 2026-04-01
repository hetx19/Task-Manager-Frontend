import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import moment from "moment";
import { motion } from "framer-motion";

// Hooks
import { useUserAuth } from "../../hooks/useUserAuth";

// Context API's
import { UserContext } from "../../context/userContext";

// Components
import DashboardLayout from "../../components/layout/DashboardLayout";
import CustomBarGraph from "../../components/charts/CustomBarGraph";
import CustomPieChart from "../../components/charts/CustomPieChart";
import TaskListTable from "../../components/TaskListTable";
import InfoCard from "../../components/card/InfoCard";

// Utils
import { addThousandsSeparator } from "../../utils/helper";
import { API_ENDPOINT } from "../../utils/api";
import axiosInst from "../../utils/axios";

const COLORS = ["#8b5cf6", "#0ea5e9", "#10b981"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const AdminDashboardPage = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  if (user?.role === "user") {
    navigate("/user/dashboard");
    return;
  }

  const [adminDashboardData, setAdminDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barGraphData, setBarGraphData] = useState([]);

  const generateChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarGraphData(priorityLevelData);
  };

  const getAdminDashBoardData = async () => {
    try {
      const response = await axiosInst.get(
        API_ENDPOINT.TASKS.GET_DASHBOARD_DATA,
      );

      if (response.data) {
        setAdminDashboardData(response.data);
        generateChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("User fetching error: ", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getAdminDashBoardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants} className="card my-5 bg-slate-900/60 border-violet-500/10">
          <div>
            <div className="col-span-3">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                Good Morning! {user?.name || ""}
              </h2>
              <p className="text-sm md:text-base text-violet-300/70 mt-1.5 font-medium">
                {moment().format("dddd Do MMM YYYY")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Tasks"
              value={addThousandsSeparator(
                adminDashboardData?.charts?.taskDistribution?.All || 0,
              )}
              color="bg-violet-500"
            />
            <InfoCard
              icon={<IoMdCard />}
              label="Pending Tasks"
              value={addThousandsSeparator(
                adminDashboardData?.charts?.taskDistribution?.Pending || 0,
              )}
              color="bg-rose-500"
            />
            <InfoCard
              icon={<IoMdCard />}
              label="In Progress Tasks"
              value={addThousandsSeparator(
                adminDashboardData?.charts?.taskDistribution?.InProgress || 0,
              )}
              color="bg-cyan-400"
            />
            <InfoCard
              icon={<IoMdCard />}
              label="Completed Tasks"
              value={addThousandsSeparator(
                adminDashboardData?.charts?.taskDistribution?.Completed || 0,
              )}
              color="bg-emerald-400"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
          <div>
            <div className="card min-h-[420px] h-full bg-slate-900/60 hover:bg-slate-900/80 transition-colors flex flex-col">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h5 className="text-lg font-semibold text-slate-200">Task Distribution</h5>
              </div>
              <CustomPieChart data={pieChartData} colors={COLORS} />
            </div>
          </div>
          <div>
            <div className="card min-h-[420px] h-full bg-slate-900/60 hover:bg-slate-900/80 transition-colors flex flex-col">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h5 className="text-lg font-semibold text-slate-200">Task Priority Levels</h5>
              </div>
              <CustomBarGraph data={barGraphData} />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="card bg-slate-900/60 border-white/10 hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-bold text-white">Recent Tasks</h5>

                <button className="card-btn-fill" onClick={onSeeMore}>
                  See All <LuArrowRight className="text-base" />
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/5">
                <TaskListTable tableData={adminDashboardData?.recentTasks || []} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
