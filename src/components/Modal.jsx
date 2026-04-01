import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden p-4 sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-10"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-100">
                {title}
              </h3>

              <button
                type="button"
                className="text-slate-400 bg-transparent hover:bg-slate-700 hover:text-white rounded-xl text-sm w-8 h-8 inline-flex justify-center items-center transition-colors cursor-pointer"
                onClick={onClose}
              >
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
