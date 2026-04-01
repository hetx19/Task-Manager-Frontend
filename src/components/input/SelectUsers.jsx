import React, { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";

// Components
import AvatarGroup from "../AvatarGroup";
import Modal from "../Modal";
import CharAvatar from "../card/CharAvatar";

// Utils
import { API_ENDPOINT } from "../../utils/api";
import axiosInst from "../../utils/axios";

const SeleteUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInst.get(API_ENDPOINT.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("User fetching error: ", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id));

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className="w-full">
      {selectedUserAvatars.length === 0 && (
        <button type="button" className="form-input !mt-0 h-[46px] flex items-center gap-2 hover:border-white/20 transition-colors" onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-base text-slate-400" />
          <span className="text-slate-400">Assign Users</span>
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="form-input !mt-0 h-[46px] flex items-center cursor-pointer hover:border-white/20 transition-colors py-[7px]" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} size={32} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-2 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
            >
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/50"
                />
              ) : (
                <CharAvatar name={user.name} width="w-10" height="h-10" style="text-sm border-2 border-violet-500/50" />
              )}

              <div className="flex-1">
                <p className="font-semibold text-slate-200">
                  {user.name}
                </p>
                <p className="text-[13px] text-slate-400">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-violet-500 bg-slate-800 border-white/20 rounded focus:ring-violet-500 focus:ring-2 cursor-pointer transition-all accent-violet-500"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 pt-5 mt-4 border-t border-white/5">
          <button className="px-5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button className="btn-primary w-auto px-6 py-2" onClick={handleAssign}>
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SeleteUsers;
