import React, { useEffect, useState } from "react";
import { THEMES } from "@/constants";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

export const SideBar = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const { getUsers, users, selectedUser, setselectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);


  useEffect(() => {
    const savedId = localStorage.getItem("chat-theme");
    const theme = THEMES.find((t) => t.id === savedId) || THEMES[0];
    setSelectedTheme(theme);
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  useEffect(() => {
    console.log("users:", users);
  }, [users]);

  return (
    <div
      className={`flex flex-col h-screen  bg-[#2c2c2c]
                 transition-all duration-300 
                 w-full sm:w-64 md:w-72 lg:w-80 
                 z-40 `}
    >
      {/* Header */}
      <div
        className="p-4 text-lg font-semibold  text-amber-50"
        style={{
          borderColor:
            selectedTheme.colors["--border"] || "rgba(255,255,255,0.1)",
        }}
      >
        <h1>Contacts</h1>
        {/* onlie checkbox */}
        <div className="mt-3 hidden lg:flex items-center justify-center gap-2 ">
          <label className="cursor-pointer flex items-center gap-2 rounded-full">
            <input type="checkbox"
              checked={showOnlineUsers}
              onChange={() => setShowOnlineUsers(!showOnlineUsers)}
              className="cursor-pointer accent-amber-200 w-5 h-5" />
            <span className="text-sm text-amber-100">Show Online Users</span>
          </label>
          <span className="text-xs text-zinc-400">({onlineUsers.length - 1} online)</span>
        </div>
      </div>
      {/* Loading State */}
      {isUsersLoading ? (
        <div className="flex-1 flex items-center justify-center text-white text-sm">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4 pb-[30%]  space-y-3 text-sm overflow-y-auto">
          {/* User List */}
          <div className="flex flex-col space-y-2">
            {users.length > 0 ? (
              filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setselectedUser(user)}
                  className="p-2 rounded-lg cursor-pointer hover:opacity-90 
                             transition text-left w-full flex items-center space-x-3"
                  style={{
                    backgroundColor:
                      selectedUser?._id === user._id
                        ? selectedTheme.colors["--primary"]
                        : selectedTheme.colors["--secondary"],
                    color: selectedTheme.colors["--foreground"],
                  }}

                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user.pic}
                      alt={user.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* Online indicator */}
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2c2c2c] rounded-full"></div>
                    )}
                  </div>

                  {/* Username */}
                  <span className="text-white font-medium truncate">
                    {user.fullname}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-center">No contacts found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
