import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import moment from "moment";

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

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboardPage = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

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

  const getUserDashBoardData = async () => {
    try {
      const response = await axiosInst.get(
        API_ENDPOINT.TASKS.GET_USER_DASHBOARD_DATA,
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
    navigate("/user/tasks");
  };

  useEffect(() => {
    getUserDashBoardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">
              Good Morning! {user?.name || ""}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={addThousandsSeparator(
              adminDashboardData?.charts?.taskDistribution?.All || 0,
            )}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Pending Tasks"
            value={addThousandsSeparator(
              adminDashboardData?.charts?.taskDistribution?.Pending || 0,
            )}
            color="bg-violet-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="In Progress Tasks"
            value={addThousandsSeparator(
              adminDashboardData?.charts?.taskDistribution?.InProgress || 0,
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Completed Tasks"
            value={addThousandsSeparator(
              adminDashboardData?.charts?.taskDistribution?.Completed || 0,
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-medium">Task Distribution</h5>
            </div>
            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-medium">Task Priority Levels</h5>
            </div>
            <CustomBarGraph data={barGraphData} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>

              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskListTable tableData={adminDashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboardPage;
