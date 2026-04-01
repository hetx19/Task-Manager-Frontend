import React, { useContext } from "react";
import { motion } from "framer-motion";

// Components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Context API'S
import { UserContext } from "../../context/userContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-violet-500/30">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grow mx-5 my-6 sm:mx-8 xl:mx-12"
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
