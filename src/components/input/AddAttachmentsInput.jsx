import React, { useState } from "react";
import { LuPaperclip } from "react-icons/lu";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArray = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArray);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item + index}
          className="flex justify-between items-center bg-slate-800/40 border border-white/5 py-2 px-3 rounded-lg mb-2 mt-2 backdrop-blur-sm group hover:border-white/10 transition-colors"
        >
          <div className="flex flex-1 items-center gap-3 border-white/5 truncate mr-3">
            <LuPaperclip className="text-violet-400 shrink-0" />
            <p className="text-[13px] text-slate-200 truncate">{item}</p>
          </div>

          <button
            type="button"
            className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity p-1"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-rose-400 hover:text-rose-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-3 mt-3">
        <div className="flex flex-1 items-center gap-2 border border-white/10 rounded-lg px-3 bg-slate-800/50 focus-within:border-violet-500/50 focus-within:bg-slate-800/80 transition-colors">
          <LuPaperclip className="text-slate-500 shrink-0" />

          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddOption(); }}
            onChange={({ target }) => setOption(target.value)}
            className="w-full text-[13px] text-slate-200 placeholder:text-slate-500 outline-none bg-transparent py-2.5"
          />
        </div>

        <button type="button" className="card-btn-fill px-4 py-2.5 text-nowrap rounded-lg" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
