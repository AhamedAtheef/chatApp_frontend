import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data.user, isCheckingAuth: false });
            get().ConnectSocket();
        } catch (error) {
            console.error("Auth check failed:", error.response?.data || error.message);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data.user, isSigningUp: false });
            get().ConnectSocket(); // ✅ Fixed
            toast.success(res.data.message);
        } catch (error) {
            console.error("Sign up failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Sign up failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    LogIn: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.user, isLoggingIn: false });
            get().ConnectSocket();
            toast.success(res.data.message);
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            get().DisconnectSocket();
            set({ authUser: null });
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
    Updateprofile: async (base64Image) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", {
                pic: base64Image,
            });
            set({ authUser: res.data.user, isUpdatingProfile: false });
            toast.success(res.data.message);
        } catch (error) {
            console.error("Update profile failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Update profile failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    ConnectSocket: () => {
        // 1. Get the current authenticated user and socket instance from the state.
        const { authUser, socket } = get();

        // 2. Prevent connection if user isn't logged in OR if already connected.
        if (!authUser || socket?.connected) return;

        // 3. Create a new socket connection to the server.
        const newSocket = io(BASE_URL, {
            withCredentials: true, // Send cookies with the connection request
            query: {
                // 4. Send the authenticated user's ID to the server during the handshake.
                // (Correction 1: Ensures the key is 'userId', not 'userIds')
                userId: authUser._id
            }
        });

        // 5. Save the new socket instance in the global state.
        set({ socket: newSocket });

        // 6. Listen for the "Online Users" event from the server.
        // (Correction 2: Listens on the 'newSocket' that was just created)
        newSocket.on("Online Users", (userIds) => {
            // 7. When the server sends the list, update the state with the array of online user IDs.
            set({ onlineUsers: userIds });
        });
    },

    DisconnectSocket: () => {
        const { socket } = get();
        if (socket) socket.disconnect();
        set({ socket: null });
    },
}));
