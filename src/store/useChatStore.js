import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isMessagesLoading: false,
    isUsersLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data.users });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (id) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${id}`);
            console.log(res.data.messages);
            set({ messages: res.data.messages });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get messages");
            console.error(error);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        if (!selectedUser?._id) {
            toast.error("No user selected");
            return;
        }

        try {
            const res = await axiosInstance.post(
                `/message/send/${selectedUser._id}`,
                messageData
            );

            set({ messages: [...messages, res.data.data] });
            toast.success(res.data.message);
            console.log(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
            console.error(error);
        }
    },

    SubscribeToMessage: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });

    },

    UnSubscribeToMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setselectedUser: (selectedUser) => {
        set({ selectedUser })
    }
}));

