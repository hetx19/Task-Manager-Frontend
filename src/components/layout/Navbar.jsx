import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";

// Components
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-slate-900/40 border-b border-white/5 backdrop-blur-xl py-4 px-7 sticky top-0 z-30 shadow-lg shadow-black/20">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="block lg:hidden text-slate-300 hover:text-white transition-colors"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </motion.button>

      <h2 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-indigo-400">
        Task Manager
      </h2>

      {openSideMenu && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[61px] -ml-4 bg-slate-900 border-r border-white/5 h-[calc(100vh-61px)] shadow-2xl z-40"
        >
          <Sidebar activeMenu={activeMenu} />
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
