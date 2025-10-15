import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

/* use for authentication state */
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data.user, isCheckingAuth: false });
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
            toast.success(res.data.message);
        } catch (error) {
            console.error("Sign up failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Sign up failed");
        } finally {
            set({ isSigningUp: false });
        }
    },
    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "logout failed");
            console.error("Logout failed:", error.response?.data || error.message);
        }
    },
    LogIn: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.user, isLoggingIn: false });
            toast.success(res.data.message);
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
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



}));