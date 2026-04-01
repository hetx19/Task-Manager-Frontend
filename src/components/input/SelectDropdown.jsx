import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="form-input !mt-0 h-[46px] flex justify-between items-center text-left hover:border-white/20"
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : <span className="text-slate-500">{placeholder}</span>}
        <span className="ml-2 text-slate-400">
          {isOpen ? (
            <LuChevronDown className="rotate-180 transition-transform" />
          ) : (
            <LuChevronDown className="transition-transform" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="absolute w-full bg-slate-800 border border-white/10 rounded-lg mt-1.5 shadow-xl shadow-black/50 z-20 overflow-hidden backdrop-blur-md">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2.5 text-[13px] text-slate-300 cursor-pointer hover:bg-slate-700/80 hover:text-white transition-colors"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
