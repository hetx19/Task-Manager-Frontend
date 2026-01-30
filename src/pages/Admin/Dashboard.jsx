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
import CustomPieChart from "../../components/charts/CustomPieChart";
import TaskListTable from "../../components/TaskListTable";
import InfoCard from "../../components/card/InfoCard";

// Utils
import { addThousandsSeparator } from "../../utils/helper";
import { API_ENDPOINT } from "../../utils/api";
import axiosInst from "../../utils/axios";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const AdminDashboardPage = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [adminDashboardData, setAdminDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const genrateChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevel = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { status: "Low", count: taskPriorityLevel?.Low || 0 },
      { status: "Medium", count: taskPriorityLevel?.Medium || 0 },
      { status: "High", count: taskPriorityLevel?.High || 0 },
    ];

    setBarChartData(priorityLevelData);
  };

  const getAdminDashBoardData = async () => {
    try {
      const responce = await axiosInst.get(
        API_ENDPOINT.TASKS.GET_DASHBOARD_DATA,
      );

      if (responce.data) {
        setAdminDashboardData(responce.data);
        genrateChartData(responce.data?.charts || null);
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
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">
              Good Morining! {user?.name || ""}
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
              <CustomPieChart
                data={pieChartData}
                label="Total Balance"
                colors={COLORS}
              />
            </div>
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

export default AdminDashboardPage;
