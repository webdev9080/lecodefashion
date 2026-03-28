"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserProvider";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import LogoutButton from "@/components/LogoutButton";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotificationsCount(data.notifications?.length || 0);
      } catch (err) {
        console.error("Erreur fetch notifications:", err);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  if (loading) return <ProfileSkeleton />;
  if (!user) return <p className="text-center mt-20">Utilisateur introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-10">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Bienvenue, {user.username} 👋
        </h1>
        <p className="opacity-90 mt-2">
          Gérez votre profil et vos informations personnelles
        </p>
      </div>

      {/* 👤 INFOS + ACTION */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* PROFIL */}
        <div className="md:col-span-2">
          <UserInfo user={user} />

          {/* 🔘 ACTIONS */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link
              href="/profile/update"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Modifier le profil
            </Link>

            <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
              Changer mot de passe
            </button>
          </div>
        </div>

        {/* 📊 STATS + Notifications */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Statistiques</h2>

          <div className="flex justify-between">
            <span>Commandes</span>
            <span className="font-bold">0</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Messages</span>
            <span className="font-bold">0</span>
          </div>

          {/* 🔔 Notifications */}
          <div className="flex justify-between items-center">
            <Link
              href="/notifications"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              Notifications
              {notificationsCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {notificationsCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex justify-between">
            <span>Statut</span>
            <span className="text-green-600 font-semibold">Actif</span>
          </div>
        </div>
      </div>

      {/* 📦 HISTORIQUE */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Historique récent</h2>

        <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
          Aucune activité pour le moment
        </div>
      </div>

      {/* ⚙️ PARAMÈTRES */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Paramètres</h2>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">

          <button className="text-left hover:bg-gray-100 p-3 rounded">
            🔒 Sécurité du compte
          </button>

          <button className="text-left hover:bg-gray-100 p-3 rounded">
            🌐 Langue
          </button>

          <button className="text-left hover:bg-gray-100 p-3 rounded">
            🔔 Notifications
          </button>

          <div className="text-left hover:bg-gray-100 p-3 rounded text-red-500">
            🚪 <LogoutButton />
          </div>

        </div>
      </div>

    </div>
  );
}