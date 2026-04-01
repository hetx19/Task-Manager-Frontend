import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 relative overflow-hidden items-center justify-center p-4 sm:p-8">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl flex flex-col relative z-10"
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-indigo-400 mb-6 text-center">
          Task Manager
        </h2>
        <div className="w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
