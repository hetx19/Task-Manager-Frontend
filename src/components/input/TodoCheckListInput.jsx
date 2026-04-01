import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoCheckListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArray = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArray);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={item + index}
          className="flex justify-between items-center bg-slate-800/40 border border-white/5 py-2 px-3 rounded-lg mb-2 mt-2 backdrop-blur-sm group hover:border-white/10 transition-colors"
        >
          <p className="text-[13px] text-slate-200 flex-1 truncate">
            <span className="text-xs text-violet-400 font-bold mr-2 opacity-80">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

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
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAddOption(); }}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-slate-200 placeholder:text-slate-500 outline-none bg-slate-800/50 border border-white/10 px-3 py-2.5 rounded-lg transition-colors focus:border-violet-500/50 focus:bg-slate-800/80"
        />

        <button type="button" className="card-btn-fill px-4 py-2.5 text-nowrap rounded-lg" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoCheckListInput;
