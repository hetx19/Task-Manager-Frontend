import React from "react";

// Utils
import { getIntials } from "../../utils/helper";

const CharAvatar = ({ name, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} flex items-center justify-center rounded-full text-violet-400 font-bold bg-slate-800 border-2 border-violet-500/50 shadow-md ${style || ""}`}
    >
      {getIntials(name || "")}
    </div>
  );
};

export default CharAvatar;
