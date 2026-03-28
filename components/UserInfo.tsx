"use client";

import { IUser } from "@/context/UserProvider";

export default function UserInfo({ user }: { user: IUser }) {
  if (!user) return null;

  // 🔥 Cache-busting avec updatedAt ou timestamp
  const avatarSrc =
    user.avatar && user.avatar !== ""
      ? `${user.avatar}?t=${user.updatedAt || Date.now()}`
      : undefined; // pas d'image par défaut si non défini

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex items-center gap-6">
      
      {/* Avatar */}
      {avatarSrc && (
        <div className="w-20 h-20 rounded-full overflow-hidden border">
          <img
            src={avatarSrc}
            alt={user.username}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/user1.jpeg"; // fallback facultatif
            }}
          />
        </div>
      )}

      {/* Infos utilisateur */}
      <div>
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>

        {user.phone && user.phone !== "" && (
          <p className="text-gray-500">📞 {user.phone}</p>
        )}

        <p className="text-sm text-gray-400 mt-1">
          Rôle : {user.role || "user"}
        </p>
      </div>
    </div>
  );
}