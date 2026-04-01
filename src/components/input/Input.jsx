import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="text-[13px] font-medium text-slate-300 mb-1 ml-1">{label}</div>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-slate-200 placeholder:text-slate-500"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer transition-colors hover:text-primary-hover"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaEyeSlash
                size={22}
                className="text-slate-500 cursor-pointer transition-colors hover:text-slate-300"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
