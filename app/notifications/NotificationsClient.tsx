"use client";

import { useEffect, useState } from "react";

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Skeleton loading
  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 animate-pulse bg-gray-200 h-8 w-1/3 rounded"></h1>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow animate-pulse space-y-2"
            >
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications 🔔</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">Aucune notification</p>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((n) => (
            <div key={n._id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold">{n.title}</h2>
              <p>{n.message}</p>
              <span className="text-sm text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}