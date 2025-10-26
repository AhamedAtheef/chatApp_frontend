import { THEMES } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import React, { useEffect, useState } from 'react';

export const ChatHeader = () => {
    const { selectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
    useEffect(() => {
        const saveId = localStorage.getItem("chat-theme");
        const theme = THEMES.find((t) => t.id === saveId) || THEMES[0];
        setSelectedTheme(theme);
    }, [selectedTheme]);
    if (!selectedUser) return null;

    return (
        <div
            className="p-2  bg-[#2c2c2c]"
        >
            <div className="flex justify-between items-center ml-[10%] md:ml-0">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full overflow-hidden"
                        style={
                            {
                                backgroundColor: selectedTheme.colors["--primary"]
                            }
                        }>
                        {selectedUser?.pic ? (
                            <img
                                src={selectedUser.pic}
                                alt={selectedUser.fullname}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className='flex justify-center items-center mt-[10%] text-center'>
                                <span className="text-white font-semibold text-xl ">
                                    {selectedUser?.fullname?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3
                            className="font-medium text-white"
                        >
                            {selectedUser.fullname}
                        </h3>
                        <p className="text-sm text-zinc-300">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
