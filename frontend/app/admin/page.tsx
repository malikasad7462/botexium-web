"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Coins, Gift, TrendingUp, Save, Plus, Trash2, Power } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState<any>({});
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([
      fetchStats(),
      fetchUsers(),
      fetchSettings(),
      fetchAnnouncements(),
    ]);
  };

  const fetchStats = async () => {
    const res = await fetch(`${API_URL}/api/admin/stats`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setStats(data.stats);
  };

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/api/admin/users`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setUsers(data.users);
  };

  const fetchSettings = async () => {
    const res = await fetch(`${API_URL}/api/admin/settings`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setSettings(data.settings);
  };

  const fetchAnnouncements = async () => {
    const res = await fetch(`${API_URL}/api/admin/announcements/all`, { credentials: "include" });
    const data = await res.json();
    if (data.success) setAnnouncements(data.announcements);
  };

  const updateSetting = async (key: string, value: string) => {
    await fetch(`${API_URL}/api/admin/settings/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ value }),
    });
    fetchSettings();
  };

  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) return;
    await fetch(`${API_URL}/api/admin/announcements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: newAnnouncement }),
    });
    setNewAnnouncement("");
    fetchAnnouncements();
  };

  const deleteAnnouncement = async (id: string) => {
    await fetch(`${API_URL}/api/admin/announcements/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchAnnouncements();
  };

  const toggleAnnouncement = async (id: string, isActive: boolean) => {
    await fetch(`${API_URL}/api/admin/announcements/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchAnnouncements();
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-[#081021] border-r border-cyan-500/10 p-6">
          <h1 className="text-xl font-bold text-cyan-400 mb-8">ADMIN PANEL</h1>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "announcements", label: "Announcements", icon: Power },
              { id: "settings", label: "Settings", icon: Save },
              { id: "users", label: "Users", icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === item.id
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview */}
          {activeTab === "overview" && stats && (
            <>
              <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                  <Users className="text-cyan-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                  <TrendingUp className="text-green-400 mb-2" />
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                </div>
                <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                  <Gift className="text-purple-400 mb-2" />
                  <p className="text-gray-400 text-sm">Total Referrals</p>
                  <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                </div>
                <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                  <Coins className="text-orange-400 mb-2" />
                  <p className="text-gray-400 text-sm">Reward Pool</p>
                  <p className="text-2xl font-bold">{stats.rewardPoolRemaining}</p>
                </div>
              </div>
            </>
          )}

          {/* Announcements */}
          {activeTab === "announcements" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Announcement Bar</h1>

              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-sm">Status:</label>
                  <button
                    onClick={() => updateSetting("announcement_enabled", settings.announcement_enabled === "true" ? "false" : "true")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      settings.announcement_enabled === "true"
                        ? "bg-green-500"
                        : "bg-gray-600"
                    }`}
                  >
                    {settings.announcement_enabled === "true" ? "ON" : "OFF"}
                  </button>
                </div>

                <h3 className="font-semibold mb-3">Announcements</h3>
                <div className="space-y-2">
                  {announcements.map((a) => (
                    <div key={a.id} className="flex items-center gap-2 p-3 bg-[#050816] rounded-lg">
                      <input
                        type="text"
                        value={a.text}
                        readOnly
                        className="flex-1 bg-transparent outline-none text-sm"
                      />
                      <button
                        onClick={() => toggleAnnouncement(a.id, a.isActive)}
                        className={`px-2 py-1 rounded text-xs ${a.isActive ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"}`}
                      >
                        {a.isActive ? "ON" : "OFF"}
                      </button>
                      <button onClick={() => deleteAnnouncement(a.id)} className="text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    placeholder="New announcement..."
                    className="flex-1 bg-[#050816] p-3 rounded-lg outline-none border border-cyan-500/10"
                  />
                  <button onClick={addAnnouncement} className="bg-cyan-500 px-4 py-2 rounded-lg">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Settings</h1>

              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h2 className="text-xl font-bold mb-4">Token Settings</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Token Price (USDT)</label>
                    <input
                      type="number"
                      value={settings.token_price || "0.01"}
                      onChange={(e) => updateSetting("token_price", e.target.value)}
                      className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Lock Period (Days)</label>
                    <input
                      type="number"
                      value={settings.lock_period || "7"}
                      onChange={(e) => updateSetting("lock_period", e.target.value)}
                      className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Minimum Purchase (USDT)</label>
                    <input
                      type="number"
                      value={settings.min_purchase || "10"}
                      onChange={(e) => updateSetting("min_purchase", e.target.value)}
                      className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                <h2 className="text-xl font-bold mb-4">Reward Settings</h2>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level}>
                      <label className="text-sm text-gray-400">Level {level} (%)</label>
                      <input
                        type="number"
                        value={settings[`reward_level_${level}`] || (6 - level)}
                        onChange={(e) => updateSetting(`reward_level_${level}`, e.target.value)}
                        className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Signup Bonus Settings */}
                   <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                      <h2 className="text-xl font-bold mb-4">Signup / Registration Bonus</h2>
  
                      {/* On/Off Toggle */}
                      <div className="flex items-center gap-4 mb-4">
                        <label className="text-sm text-gray-400">Status:</label>
                        <button
                           onClick={() => updateSetting("signup_bonus_enabled", settings.signup_bonus_enabled === "true" ? "false" : "true")}
                          className={`px-6 py-2 rounded-lg font-semibold transition ${
                          settings.signup_bonus_enabled === "true"
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300"
                         }`}
                         >
                           {settings.signup_bonus_enabled === "true" ? "ON" : "OFF"}
                       </button>
                     </div>

                       {/* Bonus Values */}
                        <div className="grid grid-cols-3 gap-4">
                         <div>
                         <label className="text-sm text-gray-400">Bonus Points</label>
                         <input
                          type="number"
                          value={settings.signup_bonus_points || "0"}
                          onChange={(e) => updateSetting("signup_bonus_points", e.target.value)}
                          className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                           placeholder="100"
                       />
                     </div>
                   <div>
                    <label className="text-sm text-gray-400">Bonus Tokens</label>
                     <input
                      type="number"
                      value={settings.signup_bonus_tokens || "0"}
                      onChange={(e) => updateSetting("signup_bonus_tokens", e.target.value)}
                      className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                      placeholder="50"
                    />
                  </div>
                <div>
                 <label className="text-sm text-gray-400">Bonus USDT</label>
                  <input
                    type="number"
                    value={settings.signup_bonus_usdt || "0"}
                    onChange={(e) => updateSetting("signup_bonus_usdt", e.target.value)}
                    className="w-full bg-[#050816] p-3 rounded-lg outline-none mt-1 border border-cyan-500/10"
                    placeholder="1"
                  />
                </div>
               </div>
              </div>

            </>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <>
              <h1 className="text-3xl font-bold mb-8">User Management</h1>
              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Country</th>
                      <th className="text-left p-4">Points</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr key={user.id} className="border-t border-cyan-500/5">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.country}</td>
                        <td className="p-4">{user.points}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "ACTIVE" 
                              ? "bg-green-400/10 text-green-400" 
                              : "bg-red-400/10 text-red-400"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}