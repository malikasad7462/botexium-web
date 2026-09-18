"use client";

import { useEffect, useState } from "react";
import {
  Users, Coins, Gift, TrendingUp, Save, Plus, Trash2,
  Power, Search, Eye, XCircle,
  DollarSign, Activity, BarChart3, Unlock,
  FileText, RefreshCw
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [settings, setSettings] = useState<any>({});
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [releaseHistory, setReleaseHistory] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Bonus/Release state
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusType, setBonusType] = useState("ADMIN");
  const [bonusReason, setBonusReason] = useState("");
  const [releaseBonus, setReleaseBonus] = useState(true);
  const [releaseRewards, setReleaseRewards] = useState(true);
  const [releaseTxHash, setReleaseTxHash] = useState("");
  const [releaseNotes, setReleaseNotes] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchUsers(),
      fetchSettings(),
      fetchAnnouncements(),
      fetchPurchases(),
      fetchRewards(),
      fetchReleaseHistory(),
      fetchAuditLogs(),
    ]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (e) { console.error(e); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (e) { console.error(e); }
  };

  const fetchUserDetail = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setSelectedUser(data.user);
    } catch (e) { console.error(e); }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/settings`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setSettings(data.settings);
    } catch (e) { console.error(e); }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/announcements/all`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setAnnouncements(data.announcements);
    } catch (e) { console.error(e); }
  };

  const fetchPurchases = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/purchases`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setPurchases(data.purchases);
    } catch (e) { console.error(e); }
  };

  const fetchRewards = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/rewards`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setRewards(data.rewards);
    } catch (e) { console.error(e); }
  };

  const fetchReleaseHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/release-history`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setReleaseHistory(data.history);
    } catch (e) { console.error(e); }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/audit-logs`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setAuditLogs(data.logs);
    } catch (e) { console.error(e); }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      await fetch(`${API_URL}/api/admin/settings/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value }),
      });
      fetchSettings();
      setMessage(`Setting "${key}" updated`);
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const updateUserStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/api/admin/users/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      fetchUsers();
      setMessage(`User status updated to ${status}`);
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      await fetch(`${API_URL}/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      });
      fetchUsers();
      setMessage(`User role updated to ${role}`);
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const addBonus = async () => {
    if (!selectedUser || !bonusAmount) return;
    try {
      await fetch(`${API_URL}/api/admin/users/${selectedUser.id}/bonus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: parseFloat(bonusAmount),
          type: bonusType,
          reason: bonusReason,
        }),
      });
      setMessage(`Bonus of ${bonusAmount} BOXM added`);
      setBonusAmount("");
      setBonusReason("");
      fetchUserDetail(selectedUser.id);
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const releaseFunds = async () => {
    if (!selectedUser || !releaseTxHash) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${selectedUser.id}/release`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          releaseBonus,
          releaseRewards,
          txHash: releaseTxHash,
          notes: releaseNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Released ${data.released} BOXM`);
        setReleaseTxHash("");
        setReleaseNotes("");
        fetchUserDetail(selectedUser.id);
        fetchUsers();
        fetchReleaseHistory();
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (e) { console.error(e); }
  };

  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) return;
    try {
      await fetch(`${API_URL}/api/admin/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: newAnnouncement }),
      });
      setNewAnnouncement("");
      fetchAnnouncements();
      setMessage("Announcement added");
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const toggleAnnouncement = async (id: string, isActive: boolean) => {
    try {
      await fetch(`${API_URL}/api/admin/announcements/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchAnnouncements();
    } catch (e) { console.error(e); }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await fetch(`${API_URL}/api/admin/announcements/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchAnnouncements();
      setMessage("Announcement deleted");
      setTimeout(() => setMessage(""), 2000);
    } catch (e) { console.error(e); }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.referralCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-300" />
          <p className="mt-4 text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {message && (
        <div className="fixed top-4 right-4 z-50 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg">
          {message}
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#081021] border-r border-cyan-500/10 p-6">
          <h1 className="text-xl font-bold text-cyan-400 mb-8">ADMIN PANEL</h1>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "users", label: "Users", icon: Users },
              { id: "transactions", label: "Transactions", icon: DollarSign },
              { id: "releases", label: "Release History", icon: Unlock },
              { id: "settings", label: "Settings", icon: Save },
              { id: "announcements", label: "Announcements", icon: Power },
              { id: "audit", label: "Audit Logs", icon: FileText },
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
          {/* ============================================ */}
          {/* OVERVIEW */}
          {/* ============================================ */}
          {activeTab === "overview" && stats && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <button
                  onClick={fetchAll}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 text-cyan-400 rounded-lg hover:bg-cyan-400/20"
                >
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Users" value={stats.totalUsers} icon={Users} color="cyan" />
                <StatCard label="Active Users" value={stats.activeUsers} icon={Activity} color="green" />
                <StatCard label="Total USDT" value={`$${stats.totalUSDT.toFixed(2)}`} icon={DollarSign} color="green" />
                <StatCard label="Tokens Sold" value={stats.totalTokensSold.toLocaleString()} icon={Coins} color="cyan" />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Referrals" value={stats.totalReferrals} icon={Users} color="purple" />
                <StatCard label="Purchases" value={stats.totalPurchases} icon={TrendingUp} color="cyan" />
                <StatCard label="Rewards Given" value={stats.totalRewardTokens.toLocaleString()} icon={Gift} color="purple" />
                <StatCard label="Bonuses Given" value={stats.totalBonusTokens.toLocaleString()} icon={Gift} color="orange" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard label="Reward Pool Total" value={stats.rewardPoolTotal.toLocaleString()} icon={Gift} color="cyan" />
                <StatCard label="Distributed" value={stats.totalRewardTokens.toLocaleString()} icon={Gift} color="purple" />
                <StatCard label="Remaining" value={stats.rewardPoolRemaining.toLocaleString()} icon={Gift} color="green" />
              </div>

              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h3 className="text-lg font-semibold mb-4">Phase 1 Progress</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Sold: {stats.phase1Sold.toLocaleString()}</span>
                  <span>Remaining: {stats.phase1Remaining.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#050816] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${((300000000 - stats.phase1Remaining) / 300000000) * 100}%` }}
                  />
                </div>
                <p className="text-right text-sm text-cyan-400 mt-2">
                  {(((300000000 - stats.phase1Remaining) / 300000000) * 100).toFixed(2)}% Sold
                </p>
              </div>
            </>
          )}

          {/* ============================================ */}
          {/* USERS */}
          {/* ============================================ */}
          {activeTab === "users" && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#081021] border border-cyan-500/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-cyan-400/40"
                  />
                </div>
              </div>

              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Country</th>
                      <th className="text-left p-4">Team</th>
                      <th className="text-left p-4">Wallet</th>
                      <th className="text-left p-4">Bonus</th>
                      <th className="text-left p-4">Rewards</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user: any) => (
                      <tr key={user.id} className="border-t border-cyan-500/5 hover:bg-white/[0.02]">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-gray-400">{user.email}</td>
                        <td className="p-4">{user.country}</td>
                        <td className="p-4">{user._count?.referrals || 0}</td>
                        <td className="p-4 text-cyan-400">{user.walletBalance?.toFixed(0) || 0}</td>
                        <td className="p-4 text-purple-400">{user.lockedBonus?.toFixed(0) || 0}</td>
                        <td className="p-4 text-green-400">{user.lockedRewards?.toFixed(0) || 0}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === "SUPER_ADMIN" ? "bg-red-400/10 text-red-400" :
                            user.role === "ADMIN" ? "bg-orange-400/10 text-orange-400" :
                            user.role === "MODERATOR" ? "bg-blue-400/10 text-blue-400" :
                            "bg-gray-400/10 text-gray-400"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "ACTIVE" ? "bg-green-400/10 text-green-400" :
                            user.status === "SUSPENDED" ? "bg-yellow-400/10 text-yellow-400" :
                            "bg-red-400/10 text-red-400"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => fetchUserDetail(user.id)}
                            className="p-1.5 rounded hover:bg-cyan-400/10 text-cyan-400"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={10} className="p-8 text-center text-gray-500">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* User Detail Modal */}
              {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                  <div className="bg-[#081021] rounded-2xl border border-cyan-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                      <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">
                        <XCircle size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <InfoRow label="Email" value={selectedUser.email} />
                      <InfoRow label="Country" value={selectedUser.country} />
                      <InfoRow label="Referral Code" value={selectedUser.referralCode} />
                      <InfoRow label="Wallet Balance" value={`${selectedUser.walletBalance || 0} BOXM`} />
                      <InfoRow label="Locked Bonus" value={`${selectedUser.lockedBonus || 0} BOXM`} />
                      <InfoRow label="Locked Rewards" value={`${selectedUser.lockedRewards || 0} BOXM`} />
                      <InfoRow label="Total Released" value={`${selectedUser.totalReleased || 0} BOXM`} />
                      <InfoRow label="Total Purchased" value={`$${selectedUser.totalPurchased || 0}`} />
                      <InfoRow label="Status" value={selectedUser.status} />
                    </div>

                    {/* Status Change */}
                    <div className="bg-[#050816] p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-3 text-cyan-400">Status</h3>
                      <div className="flex gap-2">
                        {["ACTIVE", "SUSPENDED", "BANNED"].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateUserStatus(selectedUser.id, s)}
                            className={`flex-1 py-2 rounded text-xs ${
                              selectedUser.status === s
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Role Change */}
                    <div className="bg-[#050816] p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-3 text-cyan-400">Role</h3>
                      <div className="flex gap-2">
                        {["USER", "MODERATOR", "ADMIN", "SUPER_ADMIN"].map((r) => (
                          <button
                            key={r}
                            onClick={() => updateUserRole(selectedUser.id, r)}
                            className={`flex-1 py-2 rounded text-xs ${
                              selectedUser.role === r
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add Bonus */}
                    <div className="bg-[#050816] p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-3 text-purple-400 flex items-center gap-2">
                        <Plus size={18} /> Add Bonus
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={bonusAmount}
                          onChange={(e) => setBonusAmount(e.target.value)}
                          className="bg-[#081021] p-3 rounded-lg outline-none border border-purple-500/20 text-sm"
                        />
                        <select
                          value={bonusType}
                          onChange={(e) => setBonusType(e.target.value)}
                          className="bg-[#081021] p-3 rounded-lg outline-none border border-purple-500/20 text-sm"
                        >
                          <option value="ADMIN">Admin Bonus</option>
                          <option value="SIGNUP">Signup Bonus</option>
                          <option value="PROMOTION">Promotion</option>
                          <option value="REFERRAL">Referral</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Reason"
                          value={bonusReason}
                          onChange={(e) => setBonusReason(e.target.value)}
                          className="bg-[#081021] p-3 rounded-lg outline-none border border-purple-500/20 text-sm"
                        />
                        <button
                          onClick={addBonus}
                          className="bg-purple-500 hover:bg-purple-600 p-3 rounded-lg text-sm font-semibold"
                        >
                          Add Bonus
                        </button>
                      </div>
                    </div>

                    {/* Release Funds */}
                    <div className="bg-[#050816] p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                        <Unlock size={18} /> Release Funds
                      </h3>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={releaseBonus}
                            onChange={(e) => setReleaseBonus(e.target.checked)}
                            className="w-4 h-4"
                          />
                          Release Bonus ({selectedUser.lockedBonus || 0} BOXM)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={releaseRewards}
                            onChange={(e) => setReleaseRewards(e.target.checked)}
                            className="w-4 h-4"
                          />
                          Release Rewards ({selectedUser.lockedRewards || 0} BOXM)
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="TX Hash (0x...)"
                          value={releaseTxHash}
                          onChange={(e) => setReleaseTxHash(e.target.value)}
                          className="bg-[#081021] p-3 rounded-lg outline-none border border-green-500/20 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Notes"
                          value={releaseNotes}
                          onChange={(e) => setReleaseNotes(e.target.value)}
                          className="bg-[#081021] p-3 rounded-lg outline-none border border-green-500/20 text-sm"
                        />
                        <button
                          onClick={releaseFunds}
                          className="bg-green-500 hover:bg-green-600 p-3 rounded-lg text-sm font-semibold"
                        >
                          Release Funds
                        </button>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="bg-[#050816] p-4 rounded-lg">
                      <h3 className="font-semibold mb-3 text-cyan-400">
                        Team ({selectedUser.referrals?.length || 0})
                      </h3>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {selectedUser.referrals?.map((r: any) => (
                          <div key={r.id} className="text-sm p-2 bg-[#081021] rounded flex justify-between">
                            <span>{r.name}</span>
                            <span className="text-gray-500 font-mono text-xs">{r.referralCode}</span>
                          </div>
                        ))}
                        {(!selectedUser.referrals || selectedUser.referrals.length === 0) && (
                          <p className="text-gray-500 text-sm">No referrals</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================ */}
          {/* TRANSACTIONS */}
          {/* ============================================ */}
          {activeTab === "transactions" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Transactions</h1>

              {/* Purchases */}
              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden mb-6">
                <div className="p-4 border-b border-cyan-500/10">
                  <h2 className="font-semibold">Purchases ({purchases.length})</h2>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">User ID</th>
                      <th className="text-left p-4">USDT</th>
                      <th className="text-left p-4">Tokens</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((p) => (
                      <tr key={p.id} className="border-t border-cyan-500/5">
                        <td className="p-4 font-mono text-xs">{p.userId.slice(0, 8)}...</td>
                        <td className="p-4 text-green-400">${p.usdtAmount.toFixed(2)}</td>
                        <td className="p-4 text-cyan-400">{p.tokenAmount.toLocaleString()}</td>
                        <td className="p-4">${p.price}</td>
                        <td className="p-4 text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {purchases.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-500">No purchases yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Rewards */}
              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden">
                <div className="p-4 border-b border-cyan-500/10">
                  <h2 className="font-semibold">Rewards ({rewards.length})</h2>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">User ID</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Level</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewards.map((r) => (
                      <tr key={r.id} className="border-t border-cyan-500/5">
                        <td className="p-4 font-mono text-xs">{r.userId.slice(0, 8)}...</td>
                        <td className="p-4 text-purple-400">{r.amount.toLocaleString()}</td>
                        <td className="p-4">L{r.level}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            r.status === "RELEASED" ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"
                          }`}>{r.status}</span>
                        </td>
                        <td className="p-4 text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {rewards.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-500">No rewards yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============================================ */}
          {/* RELEASE HISTORY */}
          {/* ============================================ */}
          {activeTab === "releases" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Release History</h1>
              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">User ID</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">TX Hash</th>
                      <th className="text-left p-4">Notes</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {releaseHistory.map((h) => (
                      <tr key={h.id} className="border-t border-cyan-500/5">
                        <td className="p-4 font-mono text-xs">{h.userId.slice(0, 8)}...</td>
                        <td className="p-4 text-green-400">{h.amount.toLocaleString()} BOXM</td>
                        <td className="p-4">{h.type}</td>
                        <td className="p-4 font-mono text-xs text-cyan-400">{h.txHash?.slice(0, 16)}...</td>
                        <td className="p-4 text-gray-400">{h.notes || "-"}</td>
                        <td className="p-4 text-gray-400">{new Date(h.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {releaseHistory.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500">No releases yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============================================ */}
          {/* SETTINGS */}
          {/* ============================================ */}
                    {activeTab === "settings" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Settings</h1>

              {/* Token Settings */}
              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h2 className="text-xl font-bold mb-4">Token Settings</h2>
                <div className="grid grid-cols-3 gap-4">
                  <SettingInput
                    label="Token Price (USDT)"
                    value={settings.token_price || "0.01"}
                    onSave={(v) => updateSetting("token_price", v)}
                  />
                  <SettingInput
                    label="Lock Period (Days)"
                    value={settings.lock_period || "7"}
                    onSave={(v) => updateSetting("lock_period", v)}
                  />
                  <SettingInput
                    label="Minimum Purchase (USDT)"
                    value={settings.min_purchase || "10"}
                    onSave={(v) => updateSetting("min_purchase", v)}
                  />
                </div>
              </div>

              {/* Reward Pool Settings */}
              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h2 className="text-xl font-bold mb-4">Reward Pool</h2>
                <div className="grid grid-cols-2 gap-4">
                  <SettingInput
                    label="Total Reward Pool (BOXM)"
                    value={settings.reward_pool || "0"}
                    onSave={(v) => updateSetting("reward_pool", v)}
                  />
                  <div className="flex items-end">
                    <button
                      onClick={() =>
                        updateSetting(
                          "reward_pool_active",
                          settings.reward_pool_active === "true" ? "false" : "true"
                        )
                      }
                      className={`px-6 py-3 rounded-lg font-semibold ${
                        settings.reward_pool_active === "true"
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {settings.reward_pool_active === "true" ? "ACTIVE" : "INACTIVE"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reward Percentages */}
              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h2 className="text-xl font-bold mb-4">Referral Reward Percentages</h2>
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SettingInput
                      key={level}
                      label={`Level ${level} (%)`}
                      value={settings[`reward_level_${level}`] || String(6 - level)}
                      onSave={(v) => updateSetting(`reward_level_${level}`, v)}
                    />
                  ))}
                </div>
              </div>

              {/* Signup Bonus */}
              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <h2 className="text-xl font-bold mb-4">Signup / Registration Bonus</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-end">
                    <button
                      onClick={() =>
                        updateSetting(
                          "signup_bonus_enabled",
                          settings.signup_bonus_enabled === "true" ? "false" : "true"
                        )
                      }
                      className={`px-6 py-3 rounded-lg font-semibold ${
                        settings.signup_bonus_enabled === "true"
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {settings.signup_bonus_enabled === "true" ? "BONUS ON" : "BONUS OFF"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <SettingInput
                    label="Bonus Points"
                    value={settings.signup_bonus_points || "0"}
                    onSave={(v) => updateSetting("signup_bonus_points", v)}
                  />
                  <SettingInput
                    label="Bonus Tokens"
                    value={settings.signup_bonus_tokens || "0"}
                    onSave={(v) => updateSetting("signup_bonus_tokens", v)}
                  />
                  <SettingInput
                    label="Bonus USDT"
                    value={settings.signup_bonus_usdt || "0"}
                    onSave={(v) => updateSetting("signup_bonus_usdt", v)}
                  />
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
                <h2 className="text-xl font-bold mb-4">System Settings</h2>
                <div className="space-y-3">
                  <ToggleSetting
                    label="Registration Open"
                    enabled={settings.registration_enabled !== "false"}
                    onToggle={() =>
                      updateSetting(
                        "registration_enabled",
                        settings.registration_enabled === "false" ? "true" : "false"
                      )
                    }
                  />
                  <ToggleSetting
                    label="Referral System Active"
                    enabled={settings.referral_enabled !== "false"}
                    onToggle={() =>
                      updateSetting(
                        "referral_enabled",
                        settings.referral_enabled === "false" ? "true" : "false"
                      )
                    }
                  />
                  <ToggleSetting
                    label="2FA Required"
                    enabled={settings.require_2fa === "true"}
                    onToggle={() =>
                      updateSetting(
                        "require_2fa",
                        settings.require_2fa === "true" ? "false" : "true"
                      )
                    }
                  />
                  <ToggleSetting
                    label="Maintenance Mode"
                    enabled={settings.maintenance_mode === "true"}
                    onToggle={() =>
                      updateSetting(
                        "maintenance_mode",
                        settings.maintenance_mode === "true" ? "false" : "true"
                      )
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ============================================ */}
          {/* ANNOUNCEMENTS */}
          {/* ============================================ */}
          {activeTab === "announcements" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Announcement Bar</h1>

              <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-sm text-gray-400">Bar Status:</label>
                  <button
                    onClick={() =>
                      updateSetting(
                        "announcement_enabled",
                        settings.announcement_enabled === "true" ? "false" : "true"
                      )
                    }
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      settings.announcement_enabled === "true"
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {settings.announcement_enabled === "true" ? "ON" : "OFF"}
                  </button>
                </div>

                <h3 className="font-semibold mb-3">Announcements ({announcements.length})</h3>
                <div className="space-y-2">
                  {announcements.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 p-3 bg-[#050816] rounded-lg"
                    >
                      <input
                        type="text"
                        value={a.text}
                        readOnly
                        className="flex-1 bg-transparent outline-none text-sm"
                      />
                      <button
                        onClick={() => toggleAnnouncement(a.id, a.isActive)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold ${
                          a.isActive
                            ? "bg-green-400/10 text-green-400"
                            : "bg-gray-400/10 text-gray-400"
                        }`}
                      >
                        {a.isActive ? "ON" : "OFF"}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No announcements yet
                    </p>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    placeholder="New announcement..."
                    className="flex-1 bg-[#050816] p-3 rounded-lg outline-none border border-cyan-500/10 focus:border-cyan-400/40"
                  />
                  <button
                    onClick={addAnnouncement}
                    className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ============================================ */}
          {/* AUDIT LOGS */}
          {/* ============================================ */}
          {activeTab === "audit" && (
            <>
              <h1 className="text-3xl font-bold mb-8">Audit Logs</h1>
              <div className="bg-[#081021] rounded-xl border border-cyan-500/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#050816]">
                    <tr className="text-gray-400">
                      <th className="text-left p-4">Admin ID</th>
                      <th className="text-left p-4">Action</th>
                      <th className="text-left p-4">Target</th>
                      <th className="text-left p-4">Old Value</th>
                      <th className="text-left p-4">New Value</th>
                      <th className="text-left p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-t border-cyan-500/5">
                        <td className="p-4 font-mono text-xs">
                          {log.adminId.slice(0, 8)}...
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded text-xs bg-cyan-400/10 text-cyan-400">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          {log.target ? log.target.slice(0, 12) + "..." : "-"}
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                          {log.oldValue || "-"}
                        </td>
                        <td className="p-4 text-gray-300 text-xs">
                          {log.newValue || "-"}
                        </td>
                        <td className="p-4 text-gray-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500">
                          No audit logs yet
                        </td>
                      </tr>
                    )}
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

{/* ============================================ */}
{/* HELPER COMPONENTS */}
{/* ============================================ */}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: any;
  icon: any;
  color: string;
}) {
  const colorMap: any = {
    cyan: "text-cyan-400 bg-cyan-400/10",
    green: "text-green-400 bg-green-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    orange: "text-orange-400 bg-orange-400/10",
  };

  return (
    <div className="bg-[#081021] p-6 rounded-xl border border-cyan-500/10">
      <div className={`p-2 rounded-lg inline-block mb-3 ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium mt-1">{value || "-"}</p>
    </div>
  );
}

function SettingInput({
  label,
  value,
  onSave,
}: {
  label: string;
  value: string;
  onSave: (v: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onSave(localValue);
    setEditing(false);
  };

  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <div className="flex gap-2 mt-1">
        <input
          type="text"
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value);
            setEditing(true);
          }}
          className="flex-1 bg-[#050816] p-3 rounded-lg outline-none border border-cyan-500/10 focus:border-cyan-400/40 text-sm"
        />
        {editing && (
          <button
            onClick={handleSave}
            className="bg-cyan-500 hover:bg-cyan-600 px-4 rounded-lg text-sm font-semibold"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

function ToggleSetting({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#050816] rounded-lg">
      <span className="text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${
          enabled
            ? "bg-green-500 text-white"
            : "bg-gray-600 text-gray-300"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
}