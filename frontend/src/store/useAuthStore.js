// Clean Zustand store with sessionStorage persistence
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

function getStoredAuthUser() {
    const stored = sessionStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
}

export const useAuthStore = create((set) => ({
    authUser: getStoredAuthUser(),
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", { withCredentials: true });
            set({ authUser: res.data });
            sessionStorage.setItem("authUser", JSON.stringify(res.data));
        } catch (error) {
                        toast.error(
                          error.response?.data?.message || "CheckAuth failed"
                        );

            set({ authUser: null });
            sessionStorage.removeItem("authUser");
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
            toast.success("Account created successfully");
            set({ authUser: res.data });
            sessionStorage.setItem("authUser", JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
            set({ authUser: null });
            toast.success("Logged out successfully");
            sessionStorage.removeItem("authUser");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
            sessionStorage.setItem("authUser", JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
            sessionStorage.setItem("authUser", JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));