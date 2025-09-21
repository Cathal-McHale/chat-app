import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";

const themes = [
  "coffee",
  "dark",
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
];

const SettingsPage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [email, setEmail] = useState(authUser?.email || "");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateProfile({ fullName, email });
  };

  return (
    <div className="max-w-xl mx-auto p-6 pt-16">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleProfileUpdate} className="space-y-6 bg-base-200 rounded-xl p-6 shadow">
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdatingProfile}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isUpdatingProfile}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="mt-10 bg-base-200 rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <select
          className="select select-bordered w-full"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-zinc-500">Current theme: <span className="font-bold">{theme}</span></p>
      </div>
    </div>
  );
};

export default SettingsPage;