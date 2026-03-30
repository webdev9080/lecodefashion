"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastProvider";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "announcement" | "promotion" | "update";
  createdAt: string;
}

export default function NotificationsList() {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // 🎨 couleurs par type
  const typeStyles = {
    announcement: "bg-blue-100 text-blue-600",
    promotion: "bg-green-100 text-green-600",
    update: "bg-yellow-100 text-yellow-600",
  };

  // 🔥 fetch
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
      showToast("Erreur chargement notifications", "red");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🗑️ supprimer
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      // ⚡ mise à jour instantanée
      setNotifications((prev) => prev.filter((n) => n._id !== id));

      showToast("Notification supprimée", "green");
    } catch {
      showToast("Erreur suppression", "red");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Chargement...</p>;

  if (notifications.length === 0)
    return <p className="text-center mt-10">Aucune notification</p>;

  return (
    <div className="flex flex-col w-57 gap-4">
      {notifications.map((n) => (
        <div
          key={n._id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-start gap-4 hover:shadow-md transition"
        >
          {/* CONTENU */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs px-2 py-1 rounded ${typeStyles[n.type]}`}
              >
                {n.type}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>

            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-gray-600 text-sm">{n.message}</p>
          </div>

          {/* DELETE */}
          <button
            onClick={() => handleDelete(n._id)}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}