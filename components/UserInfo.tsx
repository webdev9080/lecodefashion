"use client";

import { IUser } from "@/context/UserProvider";

export default function UserInfo({ user }: { user: IUser }) {
  if (!user) return null;

  const avatarSrc =
    user.avatar && user.avatar !== ""
      ? `${user.avatar}?t=${user.updatedAt || Date.now()}`
      : "/images/user1.jpeg"; // fallback direct

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition">
      
      {/* 🖼️ AVATAR */}
      <div className="relative">
        <img
          src={avatarSrc}
          alt={user.username}
          className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/user1.jpeg";
          }}
        />

        {/* 🟢 STATUS */}
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
      </div>

      {/* 📄 INFOS */}
      <div className="flex flex-col gap-1">
        
        {/* Nom */}
        <h2 className="text-xl font-bold text-gray-800">
          {user.username}
        </h2>

        {/* Email */}
        <p className="text-gray-500 text-sm">
          {user.email}
        </p>

        {/* Téléphone */}
        {user.phone && (
          <p className="text-gray-500 text-sm">
            📞 {user.phone}
          </p>
        )}

        {/* 🔥 ROLE BADGE */}
        <div className="mt-2">
          <span
            className={`px-3 py-1 text-xs rounded-full font-semibold
              ${
                user.role === "admin"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {user.role === "admin" ? "Admin 👑" : "Utilisateur"}
          </span>
        </div>
      </div>
    </div>
  );
}