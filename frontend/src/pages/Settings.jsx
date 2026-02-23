
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Settings() {
const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const token = localStorage.getItem("token");

  const [email, setEmail] = useState(storedUser?.email || "");
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoAssign: false,
    compactView: false,
  });

  useEffect(() => {
    if (storedUser?._id) {
      fetchSettings();
    }
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/settings/${storedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEmail(res.data.email || storedUser.email);
      setSettings(
        res.data.settings || {
          darkMode: false,
          notifications: true,
          autoAssign: false,
          compactView: false,
        }
      );

      if (res.data.settings?.darkMode) {
        document.documentElement.classList.add("dark");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/settings/${storedUser._id}`,
        settings,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, settings })
      );

      if (settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      alert("Settings Updated Successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <MainLayout>
      <div className="p-10 max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Account Settings
        </h1>

        <div className="bg-white p-8 rounded-3xl shadow-xl space-y-6">
          <div>
            <label className="text-gray-500 text-sm">
              Logged In Email
            </label>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              {email || "No Email Found"}
            </p>
          </div>

          <Toggle
            label="Dark Mode"
            checked={settings.darkMode}
            onChange={(val) =>
              setSettings({ ...settings, darkMode: val })
            }
          />

          <Toggle
            label="Email Notifications"
            checked={settings.notifications}
            onChange={(val) =>
              setSettings({ ...settings, notifications: val })
            }
          />

          <Toggle
            label="Auto Assign Tickets"
            checked={settings.autoAssign}
            onChange={(val) =>
              setSettings({ ...settings, autoAssign: val })
            }
          />

          <Toggle
            label="Compact View"
            checked={settings.compactView}
            onChange={(val) =>
              setSettings({ ...settings, compactView: val })
            }
          />

          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl w-full hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
  <p className="text-lg font-semibold text-gray-800 mt-1">
  {storedUser.email}
</p>

}
