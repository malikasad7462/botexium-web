"use client";

import { useState, useEffect } from "react";
import { Volume2, X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
    fetchSettings();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/announcements`);
      const data = await res.json();
      if (data.success) setAnnouncements(data.announcements);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/settings`);
      const data = await res.json();
      if (data.success) {
        setIsEnabled(data.settings.announcement_enabled === "true");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isEnabled || !isVisible || announcements.length === 0) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 border-b border-cyan-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <Volume2 size={16} className="text-cyan-400 animate-pulse" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-cyan-300 font-medium" key={currentIndex}>
            {announcements[currentIndex]?.text}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-full hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}