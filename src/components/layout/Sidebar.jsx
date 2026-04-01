import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Context API's
import { UserContext } from "../../context/userContext";

// Components
import CharAvatar from "../card/CharAvatar";

// Utils
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/signin");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA,
      );

      return () => {};
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-slate-900/40 border-r border-white/5 sticky top-[61px] z-20 backdrop-blur-xl flex flex-col pt-5">
      <div className="flex flex-col items-center justify-center mb-7 w-full px-6">
        <div className="relative group">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="profile image"
              className="w-20 h-20 bg-slate-800 rounded-full ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/20 transition-all duration-300 group-hover:ring-violet-400 group-hover:scale-105"
            />
          ) : (
            <div className="ring-2 ring-violet-500/50 rounded-full shadow-lg shadow-violet-500/20 overflow-hidden transition-all duration-300 group-hover:ring-violet-400 group-hover:scale-105">
              <CharAvatar
                name={user?.name}
                width="w-20"
                height="h-20"
                style="text-xl bg-slate-800 text-slate-200"
              />
            </div>
          )}
        </div>

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-violet-100 bg-violet-600/80 backdrop-blur-sm px-3 py-1 rounded-full mt-3 uppercase tracking-widest shadow-lg shadow-violet-500/30">
            Admin
          </div>
        )}
        <h5 className="text-slate-200 font-semibold leading-6 mt-3 truncate w-full text-center">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-slate-400 truncate w-full text-center mt-1">{user?.email || ""}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 w-full">
        {sideMenuData.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[14px] font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-violet-500/20 border border-violet-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] shadow-violet-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
              } py-3.5 px-4 mb-2 cursor-pointer relative overflow-hidden`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className={`text-xl ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
